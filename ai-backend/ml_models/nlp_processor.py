"""
Natural Language Processing Module
Uses: BERT, Hugging Face Transformers, spaCy
"""

from transformers import BertTokenizer, BertForSequenceClassification
import torch
import spacy

class NLPProcessor:
    def __init__(self):
        # Load BERT model from Hugging Face Transformers
        self.bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.bert_model = BertForSequenceClassification.from_pretrained('bert-base-uncased')
        
        # Load spaCy for Natural Language Processing
        try:
            self.nlp = spacy.load('en_core_web_sm')
        except:
            print("spaCy model not found. Run: python -m spacy download en_core_web_sm")
            self.nlp = None
    
    def analyze_sentiment(self, text):
        """Analyze business description sentiment using BERT"""
        inputs = self.bert_tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        outputs = self.bert_model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
        return predictions.tolist()
    
    def extract_entities(self, text):
        """Extract business entities using spaCy NLP"""
        if self.nlp:
            doc = self.nlp(text)
            entities = [(ent.text, ent.label_) for ent in doc.ents]
            return entities
        return []
    
    def process_grant_application(self, application_text):
        """Natural Language Processing for grant applications"""
        sentiment = self.analyze_sentiment(application_text)
        entities = self.extract_entities(application_text)
        
        return {
            'sentiment': sentiment,
            'entities': entities,
            'word_count': len(application_text.split()),
            'processed': True
        }
