"""
PostgreSQL Database Configuration
"""

try:
    import psycopg2
    from psycopg2 import pool
    POSTGRES_AVAILABLE = True
except ImportError:
    POSTGRES_AVAILABLE = False

class PostgresDatabase:
    """PostgreSQL database connection manager"""
    
    def __init__(self, host='localhost', port=5432, database='mutualchain', user='postgres', password=''):
        if not POSTGRES_AVAILABLE:
            print("psycopg2 not installed. Run: pip install psycopg2-binary")
            self.connection_pool = None
            return
        
        try:
            self.connection_pool = psycopg2.pool.SimpleConnectionPool(
                1, 20,
                host=host,
                port=port,
                database=database,
                user=user,
                password=password
            )
        except Exception as e:
            print(f"PostgreSQL connection error: {e}")
            self.connection_pool = None
    
    def get_connection(self):
        """Get connection from pool"""
        if self.connection_pool:
            return self.connection_pool.getconn()
        return None
    
    def return_connection(self, connection):
        """Return connection to pool"""
        if self.connection_pool:
            self.connection_pool.putconn(connection)
    
    def execute_query(self, query, params=None):
        """Execute SQL query"""
        if not self.connection_pool:
            return {"error": "Database not connected"}
        
        conn = self.get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(query, params)
            conn.commit()
            return {"success": True, "rows_affected": cursor.rowcount}
        except Exception as e:
            conn.rollback()
            return {"error": str(e)}
        finally:
            cursor.close()
            self.return_connection(conn)
    
    def fetch_data(self, query, params=None):
        """Fetch data from database"""
        if not self.connection_pool:
            return {"error": "Database not connected"}
        
        conn = self.get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(query, params)
            results = cursor.fetchall()
            return {"success": True, "data": results}
        except Exception as e:
            return {"error": str(e)}
        finally:
            cursor.close()
            self.return_connection(conn)
    
    def create_tables(self):
        """Create database tables"""
        queries = [
            """
            CREATE TABLE IF NOT EXISTS businesses (
                id SERIAL PRIMARY KEY,
                wallet_address VARCHAR(42) UNIQUE NOT NULL,
                business_name VARCHAR(255),
                business_type VARCHAR(100),
                credit_score INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS loan_applications (
                id SERIAL PRIMARY KEY,
                business_id INTEGER REFERENCES businesses(id),
                amount DECIMAL(18, 2),
                loan_type VARCHAR(50),
                status VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS invoices (
                id SERIAL PRIMARY KEY,
                business_id INTEGER REFERENCES businesses(id),
                invoice_number VARCHAR(100),
                amount DECIMAL(18, 2),
                customer_name VARCHAR(255),
                status VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        ]
        
        for query in queries:
            result = self.execute_query(query)
            if "error" in result:
                return result
        
        return {"success": True, "tables_created": len(queries)}
