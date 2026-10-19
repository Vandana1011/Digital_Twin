# CardioTwin API contract (draft)

Base URL for local development: `http://localhost:8000`

Interactive API reference after starting the server: `/docs`

This API exposes independent research model outputs. It does not create or return a combined patient risk score. Example predictions below are illustrative response shapes, not actual model results.

## `GET /health`

Liveness check; does not load the model files.

```json
{
  "status": "ok",
  "api_version": "0.1.0"
}
```

## `GET /api/v1/models`

Returns the model names, datasets, evaluation summaries, and limitations for frontend model cards. The three models are separate and use different datasets.

## `POST /api/v1/predictions/heart-disease`

Accepts the 13 UCI Cleveland features. The UCI fields are coded dataset values; the UI should label them using the dataset definitions rather than treating them as ordinary patient-facing measurements. Basic bounds reject clearly invalid values; they are API input checks, not clinical rules.

```json
{
  "age": 54,
  "sex": 1,
  "cp": 3,
  "trestbps": 130,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.0,
  "slope": 2,
  "ca": 0,
  "thal": 3
}
```

By default, response field `explanation` is `null`. Add `?include_explanation=true` to generate SHAP values using the notebook's reproducible 30-row UCI background sample and `nsamples=100`. That response also includes `decision_score` and a ranked `explanation` list. The decision score is not a probability. SHAP does not retrain or change the model. The prediction itself is the dataset's binary label, not a future event prediction or clinical diagnosis.

For SHAP, the API reads the original `processed.cleveland.data` file from `cardiotwin_artifacts/`. Set the `CARDIOTWIN_UCI_DATASET` environment variable only if you store it elsewhere.

## `POST /api/v1/predictions/diabetes-survey`

Accepts the 21 CDC BRFSS survey features, in the names and coding used by the model. Binary survey answers use 0/1; `Age`, `Education`, and `Income` are survey category codes, not years or currency.

```json
{
  "HighBP": 1,
  "HighChol": 0,
  "CholCheck": 1,
  "BMI": 27.5,
  "Smoker": 0,
  "Stroke": 0,
  "HeartDiseaseorAttack": 0,
  "PhysActivity": 1,
  "Fruits": 1,
  "Veggies": 1,
  "HvyAlcoholConsump": 0,
  "AnyHealthcare": 1,
  "NoDocbcCost": 0,
  "GenHlth": 2,
  "MentHlth": 0,
  "PhysHlth": 0,
  "DiffWalk": 0,
  "Sex": 1,
  "Age": 9,
  "Education": 5,
  "Income": 6
}
```

Response fields: `model_id`, `prediction`, `label`, `model_probability_percent`, `threshold`, `limitations`, `generated_at`. The score is not a validated personal diabetes risk estimate.

## `POST /api/v1/predictions/ecg-beat`

Accepts one already-engineered ECG beat feature vector. The ML owner confirmed the exact 13 feature names and order below. This saved model expects `V1` features. Do not substitute the `V5` features found in the multirecord ECG CSV. The API does not accept a raw waveform or wearable file; preprocessing must create this exact schema first.

```json
{
  "MLII_mean": 0.12,
  "MLII_std": 0.31,
  "MLII_min": -0.8,
  "MLII_max": 1.1,
  "MLII_peak_to_peak": 1.9,
  "V1_mean": 0.08,
  "V1_std": 0.27,
  "V1_min": -0.7,
  "V1_max": 0.9,
  "V1_peak_to_peak": 1.6,
  "rr_interval_seconds": 0.82,
  "previous_rr_seconds": 0.79,
  "rr_ratio": 1.04
}
```

Response fields: `model_id`, `prediction`, `label`, `limitations`, `generated_at`. Classes are `N` (Normal beat), `A` (Atrial premature beat), and `V` (Premature ventricular contraction). These are experimental categories, not diagnoses.

## Errors

- `422 Unprocessable Entity`: missing field, extra field, invalid number, or value outside the API schema. FastAPI returns a field-level validation detail.
- `503 Service Unavailable`: required model artifact is missing or cannot be loaded, or model inference fails.

## Data handling

Do not include names, addresses, phone numbers, or other direct identifiers in request bodies. This prototype has no database and does not persist requests or outputs. Use synthetic/example values for demos.
