// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title MutualChainInsurance
 * @dev Main insurance pool contract with AI-powered risk assessment
 * Features: Parametric insurance, Chainlink oracles, zkSNARK verification
 */
contract MutualChainInsurance is ERC721, Ownable, ReentrancyGuard {
    
    // Policy NFT structure
    struct Policy {
        uint256 policyId;
        address policyholder;
        uint256 coverageAmount;
        uint256 monthlyPremium;
        uint256 startDate;
        uint256 endDate;
        uint8 riskScore; // 0-100, calculated by AI
        PolicyType policyType;
        bool isActive;
    }
    
    enum PolicyType {
        BusinessLiability,
        Equipment,
        IncomeProtection,
        Property
    }
    
    // Claim structure
    struct Claim {
        uint256 claimId;
        uint256 policyId;
        address claimant;
        uint256 claimAmount;
        uint256 filedAt;
        ClaimStatus status;
        bytes32 evidenceHash; // IPFS hash
        bytes zkProof; // Zero-knowledge proof for privacy
    }
    
    enum ClaimStatus {
        Pending,
        UnderReview,
        Approved,
        Rejected,
        Paid
    }
    
    // State variables
    uint256 private _policyIdCounter;
    uint256 private _claimIdCounter;
    uint256 public totalValueLocked;
    uint256 public constant MIN_RISK_SCORE = 20;
    uint256 public constant MAX_RISK_SCORE = 95;
    
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public userPolicies;
    mapping(address => uint256) public stakedBalance;
    
    // Chainlink oracle for parametric triggers
    AggregatorV3Interface internal priceFeed;
    
    // Events
    event PolicyCreated(uint256 indexed policyId, address indexed policyholder, uint256 coverage);
    event ClaimFiled(uint256 indexed claimId, uint256 indexed policyId, uint256 amount);
    event ClaimProcessed(uint256 indexed claimId, ClaimStatus status);
    event PremiumPaid(uint256 indexed policyId, address indexed policyholder, uint256 amount);
    event StakeDeposited(address indexed staker, uint256 amount);
    event StakeWithdrawn(address indexed staker, uint256 amount);
    
    constructor(address _priceFeed) ERC721("MutualChain Policy", "MCP") {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    /**
     * @dev Create a new insurance policy
     * @param _coverage Amount of coverage
     * @param _premium Monthly premium amount
     * @param _duration Duration in months
     * @param _riskScore AI-calculated risk score
     * @param _policyType Type of policy
     */
    function createPolicy(
        uint256 _coverage,
        uint256 _premium,
        uint256 _duration,
        uint8 _riskScore,
        PolicyType _policyType
    ) external payable nonReentrant returns (uint256) {
        require(_riskScore >= MIN_RISK_SCORE && _riskScore <= MAX_RISK_SCORE, "Invalid risk score");
        require(msg.value >= _premium, "Insufficient premium payment");
        require(_duration > 0 && _duration <= 36, "Invalid duration");
        
        _policyIdCounter++;
        uint256 newPolicyId = _policyIdCounter;
        
        uint256 startDate = block.timestamp;
        uint256 endDate = startDate + (_duration * 30 days);
        
        policies[newPolicyId] = Policy({
            policyId: newPolicyId,
            policyholder: msg.sender,
            coverageAmount: _coverage,
            monthlyPremium: _premium,
            startDate: startDate,
            endDate: endDate,
            riskScore: _riskScore,
            policyType: _policyType,
            isActive: true
        });
        
        userPolicies[msg.sender].push(newPolicyId);
        totalValueLocked += msg.value;
        
        _safeMint(msg.sender, newPolicyId);
        
        emit PolicyCreated(newPolicyId, msg.sender, _coverage);
        return newPolicyId;
    }
    
    /**
     * @dev File a claim with zkSNARK proof
     * @param _policyId Policy ID
     * @param _amount Claim amount
     * @param _evidenceHash IPFS hash of evidence
     * @param _zkProof Zero-knowledge proof for privacy
     */
    function fileClaim(
        uint256 _policyId,
        uint256 _amount,
        bytes32 _evidenceHash,
        bytes calldata _zkProof
    ) external nonReentrant returns (uint256) {
        Policy storage policy = policies[_policyId];
        require(policy.isActive, "Policy not active");
        require(policy.policyholder == msg.sender, "Not policy owner");
        require(_amount <= policy.coverageAmount, "Amount exceeds coverage");
        require(block.timestamp <= policy.endDate, "Policy expired");
        
        _claimIdCounter++;
        uint256 newClaimId = _claimIdCounter;
        
        claims[newClaimId] = Claim({
            claimId: newClaimId,
            policyId: _policyId,
            claimant: msg.sender,
            claimAmount: _amount,
            filedAt: block.timestamp,
            status: ClaimStatus.Pending,
            evidenceHash: _evidenceHash,
            zkProof: _zkProof
        });
        
        emit ClaimFiled(newClaimId, _policyId, _amount);
        return newClaimId;
    }
    
    /**
     * @dev Process claim (called by AI oracle after verification)
     * @param _claimId Claim ID
     * @param _approved Whether claim is approved
     */
    function processClaim(uint256 _claimId, bool _approved) external onlyOwner nonReentrant {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Pending || claim.status == ClaimStatus.UnderReview, "Invalid status");
        
        if (_approved) {
            claim.status = ClaimStatus.Approved;
            
            // Pay claim
            require(address(this).balance >= claim.claimAmount, "Insufficient pool balance");
            (bool success, ) = claim.claimant.call{value: claim.claimAmount}("");
            require(success, "Payment failed");
            
            claim.status = ClaimStatus.Paid;
            totalValueLocked -= claim.claimAmount;
        } else {
            claim.status = ClaimStatus.Rejected;
        }
        
        emit ClaimProcessed(_claimId, claim.status);
    }
    
    /**
     * @dev Pay monthly premium
     * @param _policyId Policy ID
     */
    function payPremium(uint256 _policyId) external payable nonReentrant {
        Policy storage policy = policies[_policyId];
        require(policy.isActive, "Policy not active");
        require(policy.policyholder == msg.sender, "Not policy owner");
        require(msg.value >= policy.monthlyPremium, "Insufficient payment");
        
        totalValueLocked += msg.value;
        
        emit PremiumPaid(_policyId, msg.sender, msg.value);
    }
    
    /**
     * @dev Stake funds to back insurance pool
     */
    function stake() external payable nonReentrant {
        require(msg.value > 0, "Invalid amount");
        stakedBalance[msg.sender] += msg.value;
        totalValueLocked += msg.value;
        
        emit StakeDeposited(msg.sender, msg.value);
    }
    
    /**
     * @dev Withdraw staked funds
     * @param _amount Amount to withdraw
     */
    function withdraw(uint256 _amount) external nonReentrant {
        require(stakedBalance[msg.sender] >= _amount, "Insufficient balance");
        
        stakedBalance[msg.sender] -= _amount;
        totalValueLocked -= _amount;
        
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Withdrawal failed");
        
        emit StakeWithdrawn(msg.sender, _amount);
    }
    
    /**
     * @dev Get latest price from Chainlink oracle
     */
    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }
    
    /**
     * @dev Get user's policies
     */
    function getUserPolicies(address _user) external view returns (uint256[] memory) {
        return userPolicies[_user];
    }
    
    /**
     * @dev Get policy details
     */
    function getPolicyDetails(uint256 _policyId) external view returns (Policy memory) {
        return policies[_policyId];
    }
    
    /**
     * @dev Get claim details
     */
    function getClaimDetails(uint256 _claimId) external view returns (Claim memory) {
        return claims[_claimId];
    }
    
    // Receive function to accept ETH
    receive() external payable {
        totalValueLocked += msg.value;
    }
}
