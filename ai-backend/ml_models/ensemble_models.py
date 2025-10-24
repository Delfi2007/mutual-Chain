"""
Machine Learning Ensemble Models
Uses: Neural Networks, Random Forest, K-Means, Isolation Forest, ARIMA, Reinforcement Learning
"""

import numpy as np
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.cluster import KMeans
from sklearn.neural_network import MLPClassifier
try:
    from statsmodels.tsa.arima.model import ARIMA
except ImportError:
    ARIMA = None

class CreditScoringEnsemble:
    """Ensemble Models for credit scoring"""
    
    def __init__(self):
        # Random Forest for classification
        self.random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
        
        # Neural Networks for deep learning
        self.neural_network = MLPClassifier(
            hidden_layer_sizes=(100, 50, 25),
            activation='relu',
            random_state=42,
            max_iter=500
        )
        
        # Isolation Forest for anomaly detection (fraud)
        self.isolation_forest = IsolationForest(contamination=0.1, random_state=42)
        
        # K-Means for customer segmentation
        self.kmeans = KMeans(n_clusters=5, random_state=42)
        
        self.is_trained = False
    
    def train(self, X_train, y_train):
        """Train all ensemble models"""
        # Train Random Forest
        self.random_forest.fit(X_train, y_train)
        
        # Train Neural Network
        self.neural_network.fit(X_train, y_train)
        
        # Train Isolation Forest for fraud detection
        self.isolation_forest.fit(X_train)
        
        # Train K-Means for clustering
        self.kmeans.fit(X_train)
        
        self.is_trained = True
        return {"status": "trained", "models": 4}
    
    def predict_credit_score(self, features):
        """Predict credit score using ensemble of models"""
        if not self.is_trained:
            return {"error": "Models not trained"}
        
        # Random Forest prediction
        rf_pred = self.random_forest.predict_proba(features)
        
        # Neural Network prediction
        nn_pred = self.neural_network.predict_proba(features)
        
        # Ensemble prediction (weighted average)
        ensemble_pred = (rf_pred * 0.6 + nn_pred * 0.4)
        
        return {
            'credit_score': int(ensemble_pred[0][1] * 850),
            'probability': float(ensemble_pred[0][1]),
            'model': 'ensemble'
        }
    
    def detect_fraud(self, features):
        """Detect fraudulent applications using Isolation Forest"""
        if not self.is_trained:
            return {"error": "Models not trained"}
        
        prediction = self.isolation_forest.predict(features)
        anomaly_score = self.isolation_forest.score_samples(features)
        
        return {
            'is_fraud': prediction[0] == -1,
            'anomaly_score': float(anomaly_score[0]),
            'confidence': abs(float(anomaly_score[0]))
        }
    
    def segment_customer(self, features):
        """Segment customers using K-Means clustering"""
        if not self.is_trained:
            return {"error": "Models not trained"}
        
        cluster = self.kmeans.predict(features)
        
        segments = {
            0: "High-Value Enterprise",
            1: "Growing Startup",
            2: "Small Business",
            3: "Micro Business",
            4: "New Business"
        }
        
        return {
            'segment': segments.get(cluster[0], "Unknown"),
            'cluster_id': int(cluster[0])
        }


class TimeSeriesForecaster:
    """ARIMA model for time series forecasting"""
    
    def __init__(self):
        self.model = None
        self.is_fitted = False
    
    def forecast_cash_flow(self, historical_data, periods=12):
        """Forecast cash flow using ARIMA"""
        if ARIMA is None:
            return {"error": "statsmodels not installed"}
        
        try:
            # Fit ARIMA model
            self.model = ARIMA(historical_data, order=(5, 1, 0))
            fitted_model = self.model.fit()
            
            # Forecast future periods
            forecast = fitted_model.forecast(steps=periods)
            
            self.is_fitted = True
            
            return {
                'forecast': forecast.tolist(),
                'periods': periods,
                'model': 'ARIMA(5,1,0)'
            }
        except Exception as e:
            return {"error": str(e)}


class ReinforcementLearningAgent:
    """Reinforcement Learning for loan approval optimization"""
    
    def __init__(self, n_actions=2):
        self.n_actions = n_actions  # Approve or Reject
        self.q_table = {}
        self.learning_rate = 0.1
        self.discount_factor = 0.95
        self.epsilon = 0.1
    
    def get_state(self, features):
        """Convert features to state representation"""
        return tuple(np.round(features, 1))
    
    def choose_action(self, state):
        """Choose action using epsilon-greedy policy"""
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)
        
        if state not in self.q_table:
            self.q_table[state] = np.zeros(self.n_actions)
        
        return np.argmax(self.q_table[state])
    
    def learn(self, state, action, reward, next_state):
        """Update Q-table using Q-learning algorithm"""
        if state not in self.q_table:
            self.q_table[state] = np.zeros(self.n_actions)
        if next_state not in self.q_table:
            self.q_table[next_state] = np.zeros(self.n_actions)
        
        # Q-learning update rule
        old_value = self.q_table[state][action]
        next_max = np.max(self.q_table[next_state])
        new_value = old_value + self.learning_rate * (reward + self.discount_factor * next_max - old_value)
        self.q_table[state][action] = new_value
        
        return {"updated": True, "new_q_value": new_value}
    
    def decide_loan_approval(self, features):
        """Decide loan approval using Reinforcement Learning"""
        state = self.get_state(features)
        action = self.choose_action(state)
        
        return {
            'decision': 'approve' if action == 1 else 'reject',
            'action': int(action),
            'confidence': float(self.q_table.get(state, [0, 0])[action]) if state in self.q_table else 0.5
        }
