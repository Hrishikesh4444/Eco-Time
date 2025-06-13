import requests
import pandas as pd
import numpy as np
import joblib
from datetime import datetime, timedelta
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

class SolarPowerPredictorPaperModel:
    def __init__(self, lat, lon, panel_area, panel_efficiency, lags=24, timezone='UTC'):
        self.lat = lat
        self.lon = lon
        self.panel_area = panel_area
        self.panel_eff = panel_efficiency
        self.lags = lags
        self.timezone = timezone
        self.model = None
        self.features = None

    def fetch_weather(self, start, end, source='archive'):
        url = (
            'https://archive-api.open-meteo.com/v1/archive' if source == 'archive'
            else 'https://api.open-meteo.com/v1/forecast'
        )
        params = {
            'latitude': self.lat,
            'longitude': self.lon,
            'start_date': start.strftime('%Y-%m-%d'),
            'end_date': end.strftime('%Y-%m-%d'),
            'hourly': 'shortwave_radiation,temperature_2m,cloudcover,relativehumidity_2m',
            'timezone': self.timezone
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    def preprocess(self, data):
        hourly = data.get('hourly', {})
        if not hourly or not hourly.get('time'):
            print("Warning: No hourly data found in API response.")
            return pd.DataFrame()

        try:
            df = pd.DataFrame({
                'ds': pd.to_datetime(hourly['time']),
                'irradiance': np.array(hourly['shortwave_radiation'], dtype=float),
                'temperature': np.array(hourly['temperature_2m'], dtype=float),
                'cloudcover': np.array(hourly['cloudcover'], dtype=float),
                'humidity': np.array(hourly['relativehumidity_2m'], dtype=float)
            })
        except (KeyError, ValueError) as e:
            print(f"Error creating DataFrame from API data: {e}")
            return pd.DataFrame()

        df.sort_values('ds', inplace=True)
        df.ffill(inplace=True)
        df['y'] = (df['irradiance'] * self.panel_area * self.panel_eff).clip(lower=0)
        df['hour'] = df['ds'].dt.hour
        df['sin_hour'] = np.sin(2 * np.pi * df['hour'] / 24)
        df['cos_hour'] = np.cos(2 * np.pi * df['hour'] / 24)
        df['is_daylight'] = (df['irradiance'] > 10).astype(int)

        return df

    def create_lag_features(self, df):
        df_copy = df.copy()
        for lag in range(1, self.lags + 1):
            df_copy[f'y_lag_{lag}'] = df_copy['y'].shift(lag)

        for feature in ['irradiance', 'temperature', 'cloudcover', 'humidity']:
            for lag in range(1, self.lags + 1):
                df_copy[f'{feature}lag{lag}'] = df_copy[feature].shift(lag)

        df_copy.dropna(inplace=True)
        return df_copy

    def train_model(self, df):
        print("Creating features and training model...")
        df_lagged = self.create_lag_features(df)
        X = df_lagged.drop(columns=['ds', 'y'])
        y = df_lagged['y']

        self.features = X.columns
        self.model = GradientBoostingRegressor(
            n_estimators=300, 
            learning_rate=0.1, 
            max_depth=5, 
            random_state=42,
            loss='huber'
        )
        self.model.fit(X, y)
        joblib.dump(self.model, 'solar_gbr_model.pkl')
        print("Model saved as 'solar_gbr_model.pkl'")
        print("Gradient Boosting model training complete.")

    def predict(self, df_with_context):
        print("\nCreating features for forecast data...")
        df_lagged = self.create_lag_features(df_with_context)

        if df_lagged.empty:
            print("Not enough data to create features for prediction.")
            return pd.DataFrame()

        X = df_lagged[self.features]
        y_pred = self.model.predict(X)
        y_pred_clipped = np.clip(y_pred, 0, None)

        df_result = df_lagged[['ds']].copy()
        df_result['predicted_power'] = y_pred_clipped
        return df_result
