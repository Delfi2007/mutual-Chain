"""
GraphQL API Configuration
"""

try:
    from graphene import ObjectType, String, Int, Float, Schema, List, Field
    GRAPHQL_AVAILABLE = True
except ImportError:
    GRAPHQL_AVAILABLE = False
    ObjectType = object
    Schema = object

if GRAPHQL_AVAILABLE:
    class Business(ObjectType):
        """Business GraphQL type"""
        wallet_address = String()
        business_name = String()
        business_type = String()
        credit_score = Int()
        total_funded = Float()
    
    class LoanApplication(ObjectType):
        """Loan Application GraphQL type"""
        id = String()
        business_id = String()
        amount = Float()
        loan_type = String()
        status = String()
    
    class Query(ObjectType):
        """GraphQL Query definitions"""
        business = Field(Business, wallet_address=String(required=True))
        all_businesses = List(Business)
        loan_applications = List(LoanApplication, business_id=String())
        
        def resolve_business(self, info, wallet_address):
            # Mock data - replace with actual database query
            return Business(
                wallet_address=wallet_address,
                business_name="Sample Business",
                business_type="retail",
                credit_score=750,
                total_funded=50000.0
            )
        
        def resolve_all_businesses(self, info):
            # Mock data - replace with actual database query
            return [
                Business(
                    wallet_address="0x123...",
                    business_name="Coffee Shop",
                    business_type="restaurant",
                    credit_score=720,
                    total_funded=25000.0
                )
            ]
        
        def resolve_loan_applications(self, info, business_id=None):
            # Mock data - replace with actual database query
            return [
                LoanApplication(
                    id="1",
                    business_id=business_id or "123",
                    amount=10000.0,
                    loan_type="micro_loan",
                    status="approved"
                )
            ]
    
    # Create GraphQL schema
    graphql_schema = Schema(query=Query)

else:
    graphql_schema = None
    print("graphene not installed. Run: pip install graphene")


def execute_graphql_query(query_string):
    """Execute GraphQL query"""
    if not GRAPHQL_AVAILABLE or not graphql_schema:
        return {"error": "GraphQL not available"}
    
    result = graphql_schema.execute(query_string)
    
    if result.errors:
        return {"errors": [str(e) for e in result.errors]}
    
    return {"data": result.data}
