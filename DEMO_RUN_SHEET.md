# CardioTwin AI — 20-minute demo run sheet

Use synthetic/example inputs only. CardioTwin is a research prototype, not a clinical diagnosis or medical advice tool.

## Before recording

- Use one laptop for both services.
- From the repository root, start the FastAPI backend in its own terminal:

  ```cmd
  cd backend
  python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
  ```

- Start the frontend from the `CardioTwinFrontend` folder:

  ```cmd
  npm run dev
  ```

- Confirm `http://127.0.0.1:8000/health` returns `{"status":"ok","api_version":"0.1.0"}`.
- Open the website at the Vite URL (normally `http://localhost:5173/`) and the API page at `http://127.0.0.1:8000/docs`.
- Keep both terminal windows open during the demo.

## Timed outline

| Time | Presenter | Demo segment |
| --- | --- | --- |
| 0:00–1:30 | Member 3 | Introduce CardioTwin, the team roles, and the research-prototype limitation. |
| 1:30–4:00 | Member 3 | Show `backend/ARCHITECTURE.md`: frontend → FastAPI → separate saved models; optional heart SHAP path. Explain that the models use separate datasets and do not produce one combined risk score. |
| 4:00–7:00 | Member 3 | Show `/health`, then Swagger `/docs`. Point out the heart, diabetes-survey, and ECG-beat endpoints and their different input schemas. |
| 7:00–12:00 | Member 2 | Walk through the website and submit the Heart Assessment sample case. Show the result and open the full SHAP page. Mention that SHAP explains the model score and can take several seconds. |
| 12:00–15:00 | Member 1 | Explain the datasets, saved model artifacts, ECG input feature order, and the reported evaluation results. Distinguish the 5-fold cross-validation summary from the held-out test summary shown in the performance page. |
| 15:00–18:00 | Member 3 | Demonstrate one synthetic diabetes request and one engineered ECG feature request in Swagger. State that the ECG API requires MLII/V1/RR features; it does not process raw wearable data. |
| 18:00–20:00 | All | Summarize what is integrated, state limitations, and answer questions. |

## Example Swagger inputs

**Diabetes survey** (`POST /api/v1/predictions/diabetes-survey`):

```json
{
  "HighBP": 1, "HighChol": 0, "CholCheck": 1, "BMI": 27.5,
  "Smoker": 0, "Stroke": 0, "HeartDiseaseorAttack": 0,
  "PhysActivity": 1, "Fruits": 1, "Veggies": 1,
  "HvyAlcoholConsump": 0, "AnyHealthcare": 1, "NoDocbcCost": 0,
  "GenHlth": 2, "MentHlth": 0, "PhysHlth": 0, "DiffWalk": 0,
  "Sex": 1, "Age": 9, "Education": 5, "Income": 6
}
```

**ECG beat** (`POST /api/v1/predictions/ecg-beat`):

```json
{
  "MLII_mean": 0, "MLII_std": 0, "MLII_min": 0, "MLII_max": 0,
  "MLII_peak_to_peak": 0, "V1_mean": 0, "V1_std": 0, "V1_min": 0,
  "V1_max": 0, "V1_peak_to_peak": 0, "rr_interval_seconds": 1,
  "previous_rr_seconds": 1, "rr_ratio": 1
}
```

These examples are for demonstration only. Do not describe the returned label or score as a personal diagnosis or future-event risk estimate.

## Scope and limitations to say out loud

- The website currently has a heart-assessment form connected to the API. Diabetes and ECG are demonstrated through Swagger; matching frontend forms are not included.
- The heart endpoint classifies the original dataset label. It does not predict a future heart attack.
- A heart decision score is not a probability. SHAP values are mathematical attributions, not medical causes.
- The ECG endpoint expects the exact engineered 13-feature schema with V1 inputs. It cannot accept raw ECG or wearable files.
- Do not enter real patient records. Requests and predictions are not persisted by this API.
