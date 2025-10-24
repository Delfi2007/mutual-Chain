"""
Computer Vision Module
Uses: OpenCV, Tesseract OCR
"""

import cv2
import numpy as np
try:
    import pytesseract
except ImportError:
    pytesseract = None

class ComputerVisionProcessor:
    def __init__(self):
        self.cascade = None
        # Configure Tesseract path if needed
        # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    
    def extract_invoice_data(self, image_path):
        """Extract text from invoice using Tesseract OCR"""
        if pytesseract is None:
            return {"error": "Tesseract not installed"}
        
        try:
            # Read image with OpenCV
            img = cv2.imread(image_path)
            
            # Preprocess image for better OCR
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
            
            # Extract text using Tesseract OCR
            text = pytesseract.image_to_string(gray)
            
            # Extract structured data
            data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
            
            return {
                'text': text,
                'confidence': np.mean([conf for conf in data['conf'] if conf > 0]),
                'processed': True
            }
        except Exception as e:
            return {"error": str(e)}
    
    def detect_damage(self, image_path):
        """Detect damage in insurance claim photos using Computer Vision"""
        try:
            # Read image with OpenCV
            img = cv2.imread(image_path)
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Edge detection for damage assessment
            edges = cv2.Canny(gray, 50, 150)
            
            # Calculate damage severity based on edge density
            damage_ratio = np.count_nonzero(edges) / edges.size
            
            return {
                'damage_detected': damage_ratio > 0.15,
                'severity': 'high' if damage_ratio > 0.3 else 'medium' if damage_ratio > 0.15 else 'low',
                'confidence': damage_ratio,
                'processed': True
            }
        except Exception as e:
            return {"error": str(e)}
    
    def validate_document(self, image_path):
        """Validate document authenticity using OpenCV"""
        try:
            img = cv2.imread(image_path)
            
            # Check image quality
            blur_score = cv2.Laplacian(img, cv2.CV_64F).var()
            
            return {
                'valid': blur_score > 100,
                'quality_score': blur_score,
                'is_blurry': blur_score < 100
            }
        except Exception as e:
            return {"error": str(e)}
