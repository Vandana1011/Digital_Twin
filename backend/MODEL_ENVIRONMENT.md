# Model environment evidence

The attached `MainFile.ipynb` records these environment details:

- Python: `3.14.6` in notebook metadata.
- pandas: `3.0.3` in saved notebook output.
- NumPy: `2.4.6` in saved package-install output.
- scikit-learn: `1.9.0` in saved package-install output.
- joblib: `1.5.3` in saved package-install output.
- SHAP: `0.54.1` in saved package-install output.

`requirements.txt` pins the five ML packages to those recorded versions. FastAPI and Uvicorn were added for the backend and are not versions reported by the notebook.

The original training version is **unknown**. Notebook cell 12 fits `candidate_pipeline` inside the candidate-model loop; cell 130 saves that variable as `uci_heart_disease_svc_pipeline.joblib`. Cell 14 separately fits `final_model` (Logistic Regression), so it is not the object saved by cell 130. Cell 131 reloads the saved artifact and prints that its classifier is SVC, but does not print a scikit-learn version. Neither the fit/save cells nor the model metadata record `sklearn.__version__` or a training environment version. The notebook metadata says Python 3.14.6 and later package-install output shows scikit-learn 1.9.0, but those records do not conclusively tie that version to the artifact's original training run.

The currently tested loading environment is **Python 3.14.6 with scikit-learn 1.9.0**; the project owner reports that `uci_heart_disease_svc_pipeline.joblib` loads successfully there. This is loading compatibility evidence only, not evidence of the original training version. pandas 3.0.3, NumPy 2.4.6, joblib 1.5.3, and SHAP 0.54.1 are also recorded in notebook/package-install output. Do not label any of these as confirmed training versions.

## SHAP data requirement

The notebook creates `heart_background` from the original `processed.cleveland.data`: parse `?` as missing, select the model's 13 feature columns, drop incomplete rows, and sample 30 rows with `random_state=42`. It runs Kernel SHAP with `nsamples=100` and does not retrain the saved model. The downloaded CSV is stored at `cardiotwin_artifacts/processed.cleveland.data`; do not substitute ECG or Synthea rows.

Dataset source: [UCI Machine Learning Repository, processed Cleveland data](https://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data). Download verification found 303 rows with 14 comma-separated fields per row. SHA-256: `A74B7EFA387BC9D108D7D0115D831FE9B414B29AE7124F331B622B4EFA0427C8`.
