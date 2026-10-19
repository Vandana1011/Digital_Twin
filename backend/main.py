from __future__ import annotations

import math
import os
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Annotated, Any, Literal

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, model_validator


ROOT = Path(__file__).resolve().parent
ARTIFACTS = ROOT / "cardiotwin_artifacts"
RESEARCH_NOTE = "Research prototype only; not a clinical diagnosis or medical advice."
HEART_FEATURES = [
    "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
    "thalach", "exang", "oldpeak", "slope", "ca", "thal",
]
ECG_FEATURES = [
    # Confirmed against the ML owner's saved model schema. Do not substitute V5.
    "MLII_mean", "MLII_std", "MLII_min", "MLII_max", "MLII_peak_to_peak",
    "V1_mean", "V1_std", "V1_min", "V1_max", "V1_peak_to_peak",
    "rr_interval_seconds", "previous_rr_seconds", "rr_ratio",
]
DIABETES_FEATURES = [
    "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", "Stroke",
    "HeartDiseaseorAttack", "PhysActivity", "Fruits", "Veggies",
    "HvyAlcoholConsump", "AnyHealthcare", "NoDocbcCost", "GenHlth",
    "MentHlth", "PhysHlth", "DiffWalk", "Sex", "Age", "Education", "Income",
]


class FeatureInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    @model_validator(mode="after")
    def all_values_are_finite(self):
        for name, value in self.__dict__.items():
            if isinstance(value, float) and not math.isfinite(value):
                raise ValueError(f"{name} must be a finite number")
        return self


class HeartInput(FeatureInput):
    age: Annotated[float, Field(ge=18, le=100)]
    sex: Annotated[int, Field(ge=0, le=1)]
    cp: Annotated[int, Field(ge=1, le=4)]
    trestbps: Annotated[float, Field(ge=50, le=300)]
    chol: Annotated[float, Field(ge=80, le=1000)]
    fbs: Annotated[int, Field(ge=0, le=1)]
    restecg: Annotated[int, Field(ge=0, le=2)]
    thalach: Annotated[float, Field(ge=40, le=250)]
    exang: Annotated[int, Field(ge=0, le=1)]
    oldpeak: Annotated[float, Field(ge=0, le=20)]
    slope: Annotated[int, Field(ge=1, le=3)]
    ca: Annotated[int, Field(ge=0, le=3)]
    thal: Literal[3, 6, 7]


class DiabetesInput(FeatureInput):
    HighBP: Annotated[int, Field(ge=0, le=1)]
    HighChol: Annotated[int, Field(ge=0, le=1)]
    CholCheck: Annotated[int, Field(ge=0, le=1)]
    BMI: Annotated[float, Field(gt=0, le=100)]
    Smoker: Annotated[int, Field(ge=0, le=1)]
    Stroke: Annotated[int, Field(ge=0, le=1)]
    HeartDiseaseorAttack: Annotated[int, Field(ge=0, le=1)]
    PhysActivity: Annotated[int, Field(ge=0, le=1)]
    Fruits: Annotated[int, Field(ge=0, le=1)]
    Veggies: Annotated[int, Field(ge=0, le=1)]
    HvyAlcoholConsump: Annotated[int, Field(ge=0, le=1)]
    AnyHealthcare: Annotated[int, Field(ge=0, le=1)]
    NoDocbcCost: Annotated[int, Field(ge=0, le=1)]
    GenHlth: Annotated[int, Field(ge=1, le=5)]
    MentHlth: Annotated[int, Field(ge=0, le=30)]
    PhysHlth: Annotated[int, Field(ge=0, le=30)]
    DiffWalk: Annotated[int, Field(ge=0, le=1)]
    Sex: Annotated[int, Field(ge=0, le=1)]
    Age: Annotated[int, Field(ge=1, le=13)]
    Education: Annotated[int, Field(ge=1, le=6)]
    Income: Annotated[int, Field(ge=1, le=8)]


class ECGInput(FeatureInput):
    MLII_mean: float
    MLII_std: Annotated[float, Field(ge=0)]
    MLII_min: float
    MLII_max: float
    MLII_peak_to_peak: Annotated[float, Field(ge=0)]
    V1_mean: float
    V1_std: Annotated[float, Field(ge=0)]
    V1_min: float
    V1_max: float
    V1_peak_to_peak: Annotated[float, Field(ge=0)]
    rr_interval_seconds: Annotated[float, Field(gt=0, le=10)]
    previous_rr_seconds: Annotated[float, Field(gt=0, le=10)]
    rr_ratio: Annotated[float, Field(gt=0, le=20)]


@lru_cache(maxsize=1)
def heart_model():
    return joblib.load(ARTIFACTS / "uci_heart_disease_svc_pipeline.joblib")


@lru_cache(maxsize=1)
def ecg_model():
    return joblib.load(ARTIFACTS / "mitbih_waveform_rr_random_forest.joblib")


@lru_cache(maxsize=1)
def diabetes_model():
    return joblib.load(ARTIFACTS / "cdc_diabetes_random_forest_pipeline.joblib")


@lru_cache(maxsize=1)
def heart_background() -> pd.DataFrame:
    """Recreate the notebook's 30-row SHAP background without retraining."""
    dataset_path = Path(
        os.getenv("CARDIOTWIN_UCI_DATASET", str(ARTIFACTS / "processed.cleveland.data"))
    )
    if not dataset_path.is_file():
        raise HTTPException(
            status_code=503,
            detail=(
                "SHAP background file is missing. Place the original "
                "processed.cleveland.data file in cardiotwin_artifacts/ or set "
                "CARDIOTWIN_UCI_DATASET."
            ),
        )

    try:
        data = pd.read_csv(
            dataset_path,
            header=None,
            names=HEART_FEATURES + ["target"],
            na_values="?",
            skipinitialspace=True,
        )
        background = data[HEART_FEATURES].dropna()
    except Exception as exc:
        raise HTTPException(status_code=503, detail="UCI SHAP background file could not be read.") from exc

    if len(background) < 30:
        raise HTTPException(status_code=503, detail="UCI SHAP background needs at least 30 complete rows.")
    return background.sample(n=30, random_state=42)


def explain_heart(model, patient: pd.DataFrame) -> dict[str, Any]:
    try:
        import numpy as np
        import shap

        background = heart_background()

        def decision_score(values):
            frame = pd.DataFrame(values, columns=HEART_FEATURES)
            return model.decision_function(frame)

        explainer = shap.KernelExplainer(decision_score, background)
        shap_values = explainer.shap_values(patient, nsamples=100)
        contributions = np.asarray(shap_values).reshape(-1, len(HEART_FEATURES))[0]
        rows = [
            {"feature": name, "shap_contribution": float(value)}
            for name, value in zip(HEART_FEATURES, contributions)
        ]
        rows.sort(key=lambda row: abs(row["shap_contribution"]), reverse=True)
        return {
            "decision_score": float(decision_score(patient)[0]),
            "explanation": rows,
            "note": "SHAP contributions explain the model decision score; the score is not a probability or diagnosis.",
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Heart model explanation could not be generated.") from exc


def load_json(filename: str) -> dict[str, Any]:
    import json

    path = ARTIFACTS / filename
    if not path.is_file():
        raise HTTPException(status_code=503, detail=f"Required metadata is missing: {filename}")
    return json.loads(path.read_text(encoding="utf-8"))


def predict(model_loader, features: list[str], payload: FeatureInput) -> pd.DataFrame:
    missing = [name for name in features if name not in payload.model_fields_set]
    if missing:
        raise HTTPException(status_code=422, detail={"missing_features": missing})
    return pd.DataFrame([{name: getattr(payload, name) for name in features}], columns=features)


def run_prediction(model_loader, features: list[str], payload: FeatureInput):
    frame = predict(model_loader, features, payload)
    try:
        model = model_loader()
        return model, frame
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail="Model artifact is not installed on this server.") from exc
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Model artifact could not be loaded.") from exc


app = FastAPI(
    title="CardioTwin API",
    version="0.1.0",
    description="Research prototype API. Outputs are independent model results, not clinical advice.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CARDIOTWIN_CORS_ORIGINS",
            "http://localhost:3000,http://localhost:5173",
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health():
    return {"status": "ok", "api_version": app.version}


def generated_at() -> str:
    return datetime.now(timezone.utc).isoformat()


@app.get("/api/v1/models")
def list_models():
    heart = load_json("uci_heart_disease_cv_results.json")
    ecg = load_json("mitbih_model_metadata.json")
    diabetes = load_json("cdc_diabetes_model_metadata.json")
    return {
        "models": [
            {
                "model_id": "heart_disease",
                "dataset": "UCI Cleveland Heart Disease",
                "validation": heart["experiment"],
                "metrics": {name: metric["mean"] for name, metric in heart["metrics"].items()},
                "limitations": heart["limitations"],
            },
            {
                "model_id": "ecg_beat",
                "dataset": ecg["dataset"],
                "validation": "Experimental record-wise evaluation; five records",
                "metrics": {"minority_class_detection": "limited"},
                "limitations": ecg["limitations"],
            },
            {
                "model_id": "diabetes_survey",
                "dataset": diabetes["dataset"],
                "validation": "Held-out test evaluation",
                "metrics": diabetes["test_metrics"],
                "limitations": [diabetes["note"]],
            },
        ],
        "fusion": None,
        "note": "Models use different datasets and are not aligned by patient; no combined risk score is provided.",
    }


@app.post("/api/v1/predictions/heart-disease")
def predict_heart(
    payload: HeartInput,
    include_explanation: bool = Query(default=False),
):
    model, frame = run_prediction(heart_model, HEART_FEATURES, payload)
    try:
        label = int(model.predict(frame)[0])
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Heart model inference failed.") from exc
    result = {
        "model_id": "heart_disease",
        "prediction": label,
        "label": f"Original UCI target {label}",
        "explanation": None,
        "limitations": [RESEARCH_NOTE, "This classifies the dataset label; it does not predict a future heart attack."],
        "generated_at": generated_at(),
    }
    if include_explanation:
        result.update(explain_heart(model, frame))
    return result


@app.post("/api/v1/predictions/diabetes-survey")
def predict_diabetes(payload: DiabetesInput):
    model, frame = run_prediction(diabetes_model, DIABETES_FEATURES, payload)
    metadata = load_json("cdc_diabetes_model_metadata.json")
    try:
        score = float(model.predict_proba(frame)[0, 1])
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Diabetes model inference failed.") from exc
    threshold = float(metadata["selected_threshold"])
    label = int(score >= threshold)
    return {
        "model_id": "diabetes_survey",
        "prediction": label,
        "label": "Diabetes-positive survey label" if label else "Diabetes-negative survey label",
        "model_probability_percent": round(score * 100, 2),
        "threshold": threshold,
        "limitations": [metadata["note"], "This score is not a validated personal risk estimate."],
        "generated_at": generated_at(),
    }


@app.post("/api/v1/predictions/ecg-beat")
def predict_ecg(payload: ECGInput):
    model, frame = run_prediction(ecg_model, ECG_FEATURES, payload)
    try:
        prediction = str(model.predict(frame)[0])
    except Exception as exc:
        raise HTTPException(status_code=503, detail="ECG model inference failed.") from exc
    labels = {
        "N": "Normal beat category",
        "A": "Atrial premature beat category",
        "V": "Ventricular premature beat category",
    }
    return {
        "model_id": "ecg_beat",
        "prediction": prediction,
        "label": labels.get(prediction, "Unknown beat category"),
        "limitations": [RESEARCH_NOTE, "Experimental ECG beat classification; minority-class detection is limited."],
        "generated_at": generated_at(),
    }
