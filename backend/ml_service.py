from fastapi import FastAPI
from pydantic import BaseModel
from model.solar_model import SolarPowerPredictorPaperModel
import joblib
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

class PredictRequest(BaseModel):
    lat: float
    lon: float
    panel_area: float
    panel_efficiency: float
    

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["POST","GET"],
  allow_headers=["*"],
)


model = SolarPowerPredictorPaperModel(0,0,1,1)
model.model = joblib.load("model/solar_gbr_model.pkl")
model.features = model.model.feature_names_in_

@app.post("/predict")
def predict(req: PredictRequest):
   
    end = datetime.utcnow()
    start = end - timedelta(hours=model.lags + 1)
    raw = model.fetch_weather(start, end)
    df = model.preprocess(raw)
    
    model.lat, model.lon = req.lat, req.lon
    model.panel_area, model.panel_eff = req.panel_area, req.panel_efficiency
    preds = model.predict(df)
    
    last = preds.iloc[-1]
    return {
        "ds": last.ds.isoformat(),
        "predicted_power": float(last.predicted_power)
    }