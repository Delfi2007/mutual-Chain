"""
Pinata IPFS Integration for Decentralized Storage
"""

import requests
import json

class PinataIPFS:
    """Pinata integration for IPFS file storage"""
    
    def __init__(self, api_key=None, api_secret=None):
        self.api_key = api_key or "your_pinata_api_key"
        self.api_secret = api_secret or "your_pinata_api_secret"
        self.base_url = "https://api.pinata.cloud"
        
        self.headers = {
            'pinata_api_key': self.api_key,
            'pinata_secret_api_key': self.api_secret
        }
    
    def pin_file_to_ipfs(self, file_path):
        """Upload file to IPFS via Pinata"""
        url = f"{self.base_url}/pinning/pinFileToIPFS"
        
        try:
            with open(file_path, 'rb') as file:
                files = {'file': file}
                response = requests.post(url, files=files, headers=self.headers)
                
                if response.status_code == 200:
                    data = response.json()
                    return {
                        'success': True,
                        'ipfs_hash': data['IpfsHash'],
                        'pin_size': data['PinSize'],
                        'timestamp': data['Timestamp']
                    }
                else:
                    return {"error": f"Failed to pin file: {response.text}"}
        except Exception as e:
            return {"error": str(e)}
    
    def pin_json_to_ipfs(self, json_data):
        """Upload JSON data to IPFS via Pinata"""
        url = f"{self.base_url}/pinning/pinJSONToIPFS"
        
        try:
            response = requests.post(
                url,
                json={'pinataContent': json_data},
                headers=self.headers
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'success': True,
                    'ipfs_hash': data['IpfsHash'],
                    'timestamp': data['Timestamp']
                }
            else:
                return {"error": f"Failed to pin JSON: {response.text}"}
        except Exception as e:
            return {"error": str(e)}
    
    def get_file_from_ipfs(self, ipfs_hash):
        """Retrieve file from IPFS"""
        url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
        
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return {
                    'success': True,
                    'content': response.content
                }
            else:
                return {"error": f"Failed to retrieve file: {response.text}"}
        except Exception as e:
            return {"error": str(e)}
    
    def unpin_file(self, ipfs_hash):
        """Remove file from Pinata"""
        url = f"{self.base_url}/pinning/unpin/{ipfs_hash}"
        
        try:
            response = requests.delete(url, headers=self.headers)
            if response.status_code == 200:
                return {'success': True, 'message': 'File unpinned'}
            else:
                return {"error": f"Failed to unpin: {response.text}"}
        except Exception as e:
            return {"error": str(e)}
    
    def store_invoice(self, invoice_data):
        """Store invoice on IPFS via Pinata"""
        return self.pin_json_to_ipfs(invoice_data)
    
    def store_document(self, document_path, metadata):
        """Store document with metadata on IPFS"""
        # First upload the document
        doc_result = self.pin_file_to_ipfs(document_path)
        
        if doc_result.get('success'):
            # Then upload metadata
            metadata['document_hash'] = doc_result['ipfs_hash']
            meta_result = self.pin_json_to_ipfs(metadata)
            
            return {
                'success': True,
                'document_hash': doc_result['ipfs_hash'],
                'metadata_hash': meta_result.get('ipfs_hash')
            }
        
        return doc_result
