# CardioTwin AI

CardioTwin is an academic research prototype with a React website and a FastAPI service for three independent ML models: heart disease, diabetes survey, and ECG beat classification. The outputs do not form a combined patient risk score and are not medical advice.

## Run locally

You need Node.js/npm and Python. From the repository root, use two terminals.

**Terminal 1 — backend** (the saved model files must be supplied in `backend/cardiotwin_artifacts/`; see [backend setup](backend/README.md)):

```cmd
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 — frontend**:

```cmd
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173/`. The frontend uses `.env.example` as its local API URL configuration. For interactive API requests, open `http://127.0.0.1:8000/docs`.

## What is connected

- The Heart Assessment website submits to `POST /api/v1/predictions/heart-disease` and displays the saved model's class plus SHAP contributions.
- Diabetes and ECG endpoints are available through Swagger. The website does not currently include their forms.
- The ECG route requires the exact engineered MLII/V1/RR features in [the API contract](backend/API_CONTRACT.md); it does not accept raw wearable files.

## Model artifacts

Model binaries are not stored in this repository. Ask the ML team member for the matching `.joblib` artifacts and place them in `backend/cardiotwin_artifacts/`. The diabetes pipeline is about 291 MB, above GitHub's regular file limit; the team must distribute it through an agreed artifact store or Git LFS. Do not commit a substitute model or retrain/overwrite the supplied model. The Cleveland SHAP background dataset and model metadata are included in `backend/cardiotwin_artifacts/`.

## Project docs

- [Backend setup and artifact details](backend/README.md)
- [Architecture diagram](backend/ARCHITECTURE.md)
- [API contract and example requests](backend/API_CONTRACT.md)
- [Model environment evidence](backend/MODEL_ENVIRONMENT.md)
- [Frontend/backend integration notes](BACKEND_INTEGRATION.md)
- [20-minute demonstration run sheet](DEMO_RUN_SHEET.md)

## Limitations

The heart endpoint classifies the original UCI dataset label; it does not predict a future heart attack. Its decision score is not a probability. SHAP contributions explain model output and do not establish medical causation. The prototype has no database and does not persist requests or predictions. Use synthetic demo values only.
