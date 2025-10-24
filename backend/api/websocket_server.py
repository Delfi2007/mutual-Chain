"""
WebSocket Server for Real-Time Updates
"""

try:
    import asyncio
    import websockets
    import json
    WEBSOCKET_AVAILABLE = True
except ImportError:
    WEBSOCKET_AVAILABLE = False

class WebSocketServer:
    """WebSocket server for real-time data updates"""
    
    def __init__(self, host='localhost', port=8765):
        self.host = host
        self.port = port
        self.clients = set()
    
    async def register(self, websocket):
        """Register new WebSocket client"""
        self.clients.add(websocket)
        print(f"Client connected. Total clients: {len(self.clients)}")
    
    async def unregister(self, websocket):
        """Unregister WebSocket client"""
        self.clients.remove(websocket)
        print(f"Client disconnected. Total clients: {len(self.clients)}")
    
    async def handle_client(self, websocket, path):
        """Handle WebSocket client connection"""
        await self.register(websocket)
        try:
            async for message in websocket:
                # Process incoming message
                data = json.loads(message)
                
                # Broadcast to all clients
                if data.get('broadcast'):
                    await self.broadcast(message)
                else:
                    # Send response back to sender
                    response = self.process_message(data)
                    await websocket.send(json.dumps(response))
        finally:
            await self.unregister(websocket)
    
    async def broadcast(self, message):
        """Broadcast message to all connected clients"""
        if self.clients:
            await asyncio.gather(
                *[client.send(message) for client in self.clients],
                return_exceptions=True
            )
    
    def process_message(self, data):
        """Process incoming WebSocket message"""
        msg_type = data.get('type')
        
        if msg_type == 'subscribe_credit_score':
            return {
                'type': 'credit_score_update',
                'wallet': data.get('wallet'),
                'score': 750,
                'timestamp': 'now'
            }
        elif msg_type == 'subscribe_loan_status':
            return {
                'type': 'loan_status_update',
                'loan_id': data.get('loan_id'),
                'status': 'approved',
                'timestamp': 'now'
            }
        else:
            return {'type': 'error', 'message': 'Unknown message type'}
    
    async def start(self):
        """Start WebSocket server"""
        if not WEBSOCKET_AVAILABLE:
            print("websockets not installed. Run: pip install websockets")
            return
        
        print(f"WebSocket server starting on ws://{self.host}:{self.port}")
        async with websockets.serve(self.handle_client, self.host, self.port):
            await asyncio.Future()  # Run forever
    
    async def send_real_time_update(self, event_type, data):
        """Send real-time update to all clients"""
        message = json.dumps({
            'type': event_type,
            'data': data,
            'timestamp': 'now'
        })
        await self.broadcast(message)


# Example usage
if __name__ == "__main__":
    if WEBSOCKET_AVAILABLE:
        server = WebSocketServer()
        asyncio.run(server.start())
