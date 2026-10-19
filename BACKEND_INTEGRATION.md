# CardioTwin frontend/backend integration handoff

This copy connects the existing Heart Assessment page to the FastAPI backend.

## Run locally

1. Start the backend in its own terminal from the CardioTwinBackend folder:

   `python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`

2. In this frontend folder, create `.env` by copying `.env.example`. Keep `VITE_API_URL=http://127.0.0.1:8000/api/v1` for a same-computer demo.
3. Install frontend dependencies with `npm install` (or `npm ci` when using the included lockfile).
4. Start the site with `npm run dev` and open the Vite URL shown in the terminal.
5. Submit the Heart Assessment form. The result and SHAP explanation pages use the real API response.

The frontend sends a POST request to `/predictions/heart-disease?include_explanation=true`. It converts the form's category codes to the original UCI codes expected by the API (cp +1, slope +1, thal 1/2/3 to 3/6/7). The decision score is not a probability. The displayed class is the original UCI dataset class label, not a diagnosis.

## Team computer / presentation

`127.0.0.1` means the computer currently running the browser. For a demo on one laptop, run both frontend and backend on that laptop. If the frontend and backend run on different computers, set `VITE_API_URL` to the backend computer's reachable IP and port, and add the frontend origin to the FastAPI CORS allowlist. Restart Vite after changing `.env`.

## Scope

The current frontend has a heart assessment form only, so this integration covers the heart disease endpoint. The backend's diabetes survey and ECG beat endpoints remain available in Swagger at `http://127.0.0.1:8000/docs`; this frontend does not yet have matching forms/pages for them.

## Files changed in this integration

- `src/services/api.js`: real API request, input-code conversion, response mapping, and removal of mock prediction logic.
- `src/pages/HeartAssessment.jsx`: show the backend/network error returned by the service.
- `src/pages/PredictionResults.jsx` and `src/pages/ShapExplanation.jsx`: display API labels, SHAP contributions, decision-score wording, and backend limitations.
- `src/pages/ModelPerformance.jsx`, `src/pages/Home.jsx`, and `src/pages/HowItWorks.jsx`: update the displayed stratified 5-fold CV summary to the reported values (accuracy 85.46% ± 3.42%, macro F1 0.8392, ROC-AUC 0.9046).
- `.env.example`: use the FastAPI base URL.

No model file was changed or retrained. This is a local integration copy; it has not been pushed to GitHub.
