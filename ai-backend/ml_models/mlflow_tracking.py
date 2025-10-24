"""
MLflow Model Tracking and Management
"""

try:
    import mlflow
    import mlflow.sklearn
    import mlflow.tensorflow
    MLFLOW_AVAILABLE = True
except ImportError:
    MLFLOW_AVAILABLE = False

class MLflowTracker:
    """Track ML experiments using MLflow"""
    
    def __init__(self, experiment_name="mutualchain-ml"):
        if not MLFLOW_AVAILABLE:
            print("MLflow not installed. Run: pip install mlflow")
            return
        
        mlflow.set_experiment(experiment_name)
        self.experiment_name = experiment_name
    
    def log_model_training(self, model, model_name, params, metrics):
        """Log model training run to MLflow"""
        if not MLFLOW_AVAILABLE:
            return {"error": "MLflow not available"}
        
        with mlflow.start_run(run_name=model_name):
            # Log parameters
            mlflow.log_params(params)
            
            # Log metrics
            mlflow.log_metrics(metrics)
            
            # Log model
            mlflow.sklearn.log_model(model, model_name)
            
            return {
                "logged": True,
                "experiment": self.experiment_name,
                "model": model_name
            }
    
    def load_model(self, model_name, version=None):
        """Load model from MLflow registry"""
        if not MLFLOW_AVAILABLE:
            return None
        
        if version:
            model_uri = f"models:/{model_name}/{version}"
        else:
            model_uri = f"models:/{model_name}/latest"
        
        return mlflow.sklearn.load_model(model_uri)
    
    def compare_models(self, run_ids):
        """Compare multiple model runs"""
        if not MLFLOW_AVAILABLE:
            return {"error": "MLflow not available"}
        
        results = []
        for run_id in run_ids:
            run = mlflow.get_run(run_id)
            results.append({
                'run_id': run_id,
                'metrics': run.data.metrics,
                'params': run.data.params
            })
        
        return results
