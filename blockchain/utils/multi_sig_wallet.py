"""
Multi-Signature Wallet Implementation
Requires multiple signatures for high-value transactions
"""

from typing import List, Dict
import hashlib
import json

class MultiSignatureWallet:
    """Multi-Signature wallet for secure fund management"""
    
    def __init__(self, owners: List[str], required_signatures: int):
        """
        Initialize multi-sig wallet
        
        Args:
            owners: List of owner addresses
            required_signatures: Number of signatures required (e.g., 3 of 5)
        """
        self.owners = owners
        self.required_signatures = required_signatures
        self.pending_transactions = {}
        self.executed_transactions = []
        self.transaction_counter = 0
    
    def create_transaction(self, to_address: str, amount: float, data: dict = None):
        """Create a new transaction requiring multiple signatures"""
        tx_id = self.transaction_counter
        self.transaction_counter += 1
        
        transaction = {
            'id': tx_id,
            'to': to_address,
            'amount': amount,
            'data': data or {},
            'signatures': [],
            'executed': False,
            'created_at': 'now'
        }
        
        self.pending_transactions[tx_id] = transaction
        
        return {
            'success': True,
            'transaction_id': tx_id,
            'required_signatures': self.required_signatures
        }
    
    def sign_transaction(self, tx_id: int, signer_address: str):
        """Sign a pending transaction"""
        if tx_id not in self.pending_transactions:
            return {"error": "Transaction not found"}
        
        if signer_address not in self.owners:
            return {"error": "Not an authorized signer"}
        
        tx = self.pending_transactions[tx_id]
        
        if signer_address in tx['signatures']:
            return {"error": "Already signed by this address"}
        
        # Add signature
        tx['signatures'].append(signer_address)
        
        # Check if enough signatures
        if len(tx['signatures']) >= self.required_signatures:
            return self.execute_transaction(tx_id)
        
        return {
            'success': True,
            'signatures_count': len(tx['signatures']),
            'signatures_required': self.required_signatures,
            'status': 'pending'
        }
    
    def execute_transaction(self, tx_id: int):
        """Execute transaction once enough signatures collected"""
        if tx_id not in self.pending_transactions:
            return {"error": "Transaction not found"}
        
        tx = self.pending_transactions[tx_id]
        
        if len(tx['signatures']) < self.required_signatures:
            return {"error": "Not enough signatures"}
        
        if tx['executed']:
            return {"error": "Transaction already executed"}
        
        # Mark as executed
        tx['executed'] = True
        tx['executed_at'] = 'now'
        
        # Move to executed transactions
        self.executed_transactions.append(tx)
        del self.pending_transactions[tx_id]
        
        return {
            'success': True,
            'transaction_id': tx_id,
            'executed': True,
            'to': tx['to'],
            'amount': tx['amount']
        }
    
    def revoke_signature(self, tx_id: int, signer_address: str):
        """Revoke a signature before execution"""
        if tx_id not in self.pending_transactions:
            return {"error": "Transaction not found"}
        
        tx = self.pending_transactions[tx_id]
        
        if signer_address not in tx['signatures']:
            return {"error": "Signature not found"}
        
        tx['signatures'].remove(signer_address)
        
        return {
            'success': True,
            'signatures_count': len(tx['signatures']),
            'status': 'revoked'
        }
    
    def get_pending_transactions(self):
        """Get all pending transactions"""
        return {
            'success': True,
            'transactions': list(self.pending_transactions.values()),
            'count': len(self.pending_transactions)
        }
    
    def add_owner(self, new_owner: str, initiator: str):
        """Add a new owner (requires multi-sig)"""
        if initiator not in self.owners:
            return {"error": "Not authorized"}
        
        data = {'action': 'add_owner', 'new_owner': new_owner}
        return self.create_transaction(
            to_address=new_owner,
            amount=0,
            data=data
        )
    
    def remove_owner(self, owner_to_remove: str, initiator: str):
        """Remove an owner (requires multi-sig)"""
        if initiator not in self.owners:
            return {"error": "Not authorized"}
        
        if len(self.owners) - 1 < self.required_signatures:
            return {"error": "Cannot remove owner: would fall below required signatures"}
        
        data = {'action': 'remove_owner', 'owner': owner_to_remove}
        return self.create_transaction(
            to_address=owner_to_remove,
            amount=0,
            data=data
        }


# Example usage for MutualChain platform
mutualchain_multisig = MultiSignatureWallet(
    owners=[
        '0x1234...', # Admin 1
        '0x5678...', # Admin 2
        '0x9abc...', # Admin 3
        '0xdef0...', # Admin 4
        '0x1111...'  # Admin 5
    ],
    required_signatures=3  # 3 out of 5 signatures required
)
