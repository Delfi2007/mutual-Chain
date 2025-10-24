"""
Rate Limiting for API endpoints
"""

import time
from collections import defaultdict
from functools import wraps

class RateLimiter:
    """Rate limiting implementation"""
    
    def __init__(self, max_requests=100, window_seconds=60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, client_id):
        """Check if request is allowed for client"""
        now = time.time()
        window_start = now - self.window_seconds
        
        # Remove old requests outside the window
        self.requests[client_id] = [
            req_time for req_time in self.requests[client_id]
            if req_time > window_start
        ]
        
        # Check if client exceeded rate limit
        if len(self.requests[client_id]) >= self.max_requests:
            return False
        
        # Add current request
        self.requests[client_id].append(now)
        return True
    
    def get_remaining(self, client_id):
        """Get remaining requests for client"""
        now = time.time()
        window_start = now - self.window_seconds
        
        recent_requests = [
            req_time for req_time in self.requests[client_id]
            if req_time > window_start
        ]
        
        return max(0, self.max_requests - len(recent_requests))
    
    def rate_limit(self, func):
        """Decorator for rate limiting"""
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Extract client ID from request
            client_id = kwargs.get('client_id') or 'default'
            
            if not self.is_allowed(client_id):
                return {
                    'error': 'Rate limit exceeded',
                    'retry_after': self.window_seconds,
                    'status_code': 429
                }
            
            remaining = self.get_remaining(client_id)
            result = func(*args, **kwargs)
            
            # Add rate limit headers to response
            if isinstance(result, dict):
                result['rate_limit_remaining'] = remaining
                result['rate_limit_limit'] = self.max_requests
            
            return result
        
        return wrapper


# Global rate limiters
api_limiter = RateLimiter(max_requests=100, window_seconds=60)
auth_limiter = RateLimiter(max_requests=10, window_seconds=60)
ml_limiter = RateLimiter(max_requests=20, window_seconds=60)


@api_limiter.rate_limit
def get_credit_score(wallet_address, client_id=None):
    """Rate-limited credit score endpoint"""
    return {
        'wallet': wallet_address,
        'score': 750,
        'success': True
    }


@ml_limiter.rate_limit
def predict_loan_approval(features, client_id=None):
    """Rate-limited ML prediction endpoint"""
    return {
        'prediction': 'approved',
        'confidence': 0.87,
        'success': True
    }
