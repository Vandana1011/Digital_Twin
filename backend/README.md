# CardioTwin Backend

FastAPI backend for the CardioTwin research prototype. It accepts feature data from a frontend, sends it to the corresponding saved ML model, and returns the model output as JSON.

The heart, diabetes, and ECG models are independent. They use different datasets and do not produce a combined patient risk score. This project is for demonstration and research only; outputs are not diagnoses or medical advice.

## Start the API on Windows

From the repository root, open Anaconda Prompt or Command Prompt and run:

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API runs at `http://127.0.0.1:8000`.

- Interactive API page: <http://127.0.0.1:8000/docs>
- Health check: <http://127.0.0.1:8000/health>
- API contract and example requests: [`API_CONTRACT.md`](API_CONTRACT.md)
- Model and Python version evidence: [`MODEL_ENVIRONMENT.md`](MODEL_ENVIRONMENT.md)
- System diagram: [`ARCHITECTURE.md`](ARCHITECTURE.md)

To stop the server, press `Ctrl+C` in the terminal running Uvicorn.

### Python environment note

Use the Python environment that successfully loads the supplied heart model. The current compatibility check was reported with Python 3.14.6 and scikit-learn 1.9.0; the original model training version is unknown. Installing these packages into a shared Anaconda environment may show dependency conflict warnings if other packages are installed there. A separate virtual environment is recommended for a clean project setup. See `MODEL_ENVIRONMENT.md` before changing package versions.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Confirm the API process is running |
| `GET` | `/api/v1/models` | List model datasets, evaluation summaries, and limitations |
| `POST` | `/api/v1/predictions/heart-disease` | Predict the UCI Cleveland dataset label; optional SHAP explanation |
| `POST` | `/api/v1/predictions/diabetes-survey` | Predict the CDC survey dataset label |
| `POST` | `/api/v1/predictions/ecg-beat` | Classify one preprocessed ECG beat feature vector |

The exact input names, coding, example JSON, and response fields are in `API_CONTRACT.md` and `/docs`. The frontend should use the same machine's `http://127.0.0.1:8000` during local development. `localhost` on a teammate's computer refers to that teammate's own computer, so a hosted backend or shared network setup is needed for separate machines.

The default CORS allowlist includes `http://localhost:3000` and `http://localhost:5173`. For another frontend origin, set `CARDIOTWIN_CORS_ORIGINS` to comma-separated origins before starting the server.

## Model and data files

Place the supplied model and metadata files in `cardiotwin_artifacts/`. The heart SHAP endpoint also reads `processed.cleveland.data` from that folder. Set `CARDIOTWIN_UCI_DATASET` only if the dataset is stored elsewhere.

The saved heart SVC pipeline (`uci_heart_disease_svc_pipeline.joblib`) is included in Git so the heart prediction route can load the existing artifact. The ECG and diabetes `.joblib` files remain excluded until the team agrees how to distribute them. The diabetes model is about 291 MB, above GitHub's regular file limit, so use an agreed artifact store, a GitHub Release asset, or Git LFS for that file. Until their model binaries are supplied, the ECG and diabetes routes return an unavailable-model response. Metadata JSON files and the UCI background dataset are tracked.

The ECG endpoint expects exactly the 13 engineered MLII/V1/RR features documented in `API_CONTRACT.md`. It accepts neither raw wearable files nor a V5 substitute. The frontend or ML preprocessing component must provide that exact feature vector.

## Data handling

- This API does not include a database and does not persist requests or predictions.
- Request bodies should not contain names, addresses, phone numbers, or other direct identifiers.
- Use synthetic/demo values for class presentations; do not send real patient records to this prototype.
- Heart SHAP values explain the model decision score. That score is not a probability. Enabling SHAP does not retrain or overwrite the saved model.
