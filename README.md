# CardioTwin AI

## Project title

**CardioTwin AI — Heart Health Digital Twin Prototype**

## Team and institution

- **Team members:**
  - Samrin Shaik — Dataset and Machine Learning
  - Mohammed Faisal — Frontend and UI/UX Design
  - Vandana Vajji — Backend, Integration and Documentation
- **Institution:** Independent student team; no college or incubator affiliation.

## Problem statement

Health information can be spread across clinical measurements, lifestyle surveys, and wearable signals. This prototype demonstrates how separate machine-learning models can accept those kinds of inputs through a web application and return model outputs for review. The models use different datasets and are not joined to an individual patient's record; the application does not create a unified digital twin or combined risk score.

## Healthcare use case

For an academic demonstration, a user enters synthetic heart-health values in the Heart Assessment page and receives the saved model's dataset-class prediction with optional SHAP feature contributions. The backend also exposes separate diabetes-survey and engineered ECG-beat prediction endpoints through its API. This research prototype is not a clinical decision-support tool, diagnosis, or medical advice. Use synthetic demo values only; do not enter identifiable or real patient data.

## Technical stack

- **Frontend:** React, Vite, JavaScript, HTML, CSS
- **Backend/API:** Python, FastAPI, Uvicorn
- **ML/data:** scikit-learn, pandas, NumPy, joblib; SHAP for optional heart-model explanation
- **Interface:** JSON over HTTP; OpenAPI/Swagger docs at `/docs`

## AI/ML model and framework details

CardioTwin serves three independent saved models: a UCI Cleveland heart-disease classifier (saved SVC pipeline), a diabetes survey classifier, and an ECG beat classifier. The heart endpoint can return Kernel SHAP contributions based on the UCI Cleveland background dataset. The ECG endpoint expects 13 engineered MLII/V1/RR features; it does not process raw wearable waveforms. See [model environment evidence](backend/MODEL_ENVIRONMENT.md) and the [API contract](backend/API_CONTRACT.md) for schemas and version caveats. Model outputs do not combine into a patient-specific score.

## Team and submission links

- **Live website:** [CardioTwin AI](https://digital-twin-six-sandy.vercel.app)
- **Live backend API docs:** [FastAPI Swagger UI](https://cardiotwin-api-vandana.onrender.com/docs)
- **Live API base URL:** `https://cardiotwin-api-vandana.onrender.com/api/v1`
- **15–20 minute demo video (unlisted YouTube):** [Add the video URL after uploading]
- **Presentation (PDF/PPT):** [Add a public link to the presentation]
- **Architecture diagram (PDF/PPT):** [CardioTwin system architecture](output/pdf/CardioTwin_Architecture.pdf)
- **Open-source license:** [Choose a license with the team and add its details; no license is currently declared]

> Submission checklist: add the demo video, presentation, and license details before submitting. The architecture diagram is available as a PDF export. The heart model artifact is included; ECG and diabetes model binaries still need separate distribution. Verify that every linked file is publicly accessible without extra permissions.

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

The saved heart SVC pipeline is included at `backend/cardiotwin_artifacts/uci_heart_disease_svc_pipeline.joblib` so the deployed heart assessment can load the existing model. The ECG and diabetes model binaries remain excluded until the team agrees how to distribute them; the diabetes pipeline is about 291 MB and exceeds GitHub's regular file limit. Do not commit a substitute model or retrain/overwrite the supplied model. The Cleveland SHAP background dataset and model metadata are also included in `backend/cardiotwin_artifacts/`.

## Project docs

- [Backend setup and artifact details](backend/README.md)
- [Architecture diagram](backend/ARCHITECTURE.md)
- [API contract and example requests](backend/API_CONTRACT.md)
- [Model environment evidence](backend/MODEL_ENVIRONMENT.md)
- [Frontend/backend integration notes](BACKEND_INTEGRATION.md)
- [20-minute demonstration run sheet](DEMO_RUN_SHEET.md)

## Limitations

The heart endpoint classifies the original UCI dataset label; it does not predict a future heart attack. Its decision score is not a probability. SHAP contributions explain model output and do not establish medical causation. The prototype has no database and does not persist requests or predictions. Use synthetic demo values only.
