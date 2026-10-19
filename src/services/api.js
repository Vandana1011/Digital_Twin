export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';
export const USE_REAL_BACKEND = true;

export const MODEL_EVALUATION_METRICS = {
  accuracy: 85.46,
  accuracyStd: 3.42,
  macroF1: 0.8392,
  macroF1Std: 0.0369,
  rocAuc: 0.9046,
  rocAucStd: 0.028,
  sampleSize: 303,
  dataset: 'UCI Cleveland Heart Disease Repository (303 Total Records)',
  validation: '5-fold stratified cross-validation (shuffle=True, random_state=42)',
  modelType: 'Support Vector Classifier (SVC with RBF Kernel)',
  classificationTask: 'Binary Classification (Class 0: Absence vs Class 1: Presence)',
  class0Definition: 'Original UCI target value 0 (Absence of coronary artery disease)',
  class1Definition: 'Original UCI target values 1, 2, 3, and 4 combined (Presence of CAD with >=50% diameter narrowing)',
  crossValidationFolds: [
    { fold: 'Fold 1', accuracy: 90.16, f1: 0.8929, rocAuc: 0.9448 },
    { fold: 'Fold 2', accuracy: 81.97, f1: 0.8070, rocAuc: 0.8571 },
    { fold: 'Fold 3', accuracy: 88.52, f1: 0.8727, rocAuc: 0.9102 },
    { fold: 'Fold 4', accuracy: 81.67, f1: 0.8000, rocAuc: 0.9091 },
    { fold: 'Fold 5', accuracy: 85.00, f1: 0.8235, rocAuc: 0.9018 },
  ],
};

export const CLINICAL_FEATURE_DEFINITIONS = {
  age: {
    label: 'Age',
    unit: 'years',
    category: 'Patient Profile',
    normalRange: '29 – 77 yrs',
    description: 'Patient chronological age in completed years.',
    tooltip: 'Age is an established cardiovascular risk factor. Advanced age correlates with cumulative vascular exposure and arterial stiffness.',
  },
  sex: {
    label: 'Biological Sex',
    unit: 'category',
    category: 'Patient Profile',
    options: { '1': 'Male', '0': 'Female' },
    description: 'Biological sex assigned at birth.',
    tooltip: 'In epidemiological cohorts, male biological sex is historically associated with earlier manifestation of coronary artery disease.',
  },
  cp: {
    label: 'Chest Pain Type',
    unit: 'scale (0–3)',
    category: 'Cardiac Assessment',
    options: {
      '0': 'Typical Angina',
      '1': 'Atypical Angina',
      '2': 'Non-Anginal Pain',
      '3': 'Asymptomatic',
    },
    description: 'Clinical classification of reported thoracic discomfort.',
    tooltip: 'Chest pain type categorizes exertional angina. In the Cleveland dataset, asymptomatic presentations (3) frequently associate with silent ischemia.',
  },
  trestbps: {
    label: 'Resting Blood Pressure',
    unit: 'mmHg',
    category: 'Clinical Measurements',
    normalRange: '< 120 mmHg',
    description: 'Systolic blood pressure recorded at resting admission state.',
    tooltip: 'Elevated systolic pressure contributes to endothelial shear stress and accelerated coronary atherogenesis.',
  },
  chol: {
    label: 'Serum Cholesterol',
    unit: 'mg/dL',
    category: 'Clinical Measurements',
    normalRange: '< 200 mg/dL',
    description: 'Total serum cholesterol measured after overnight fast.',
    tooltip: 'Circulating lipoproteins infiltrate arterial intima, driving inflammatory plaque development.',
  },
  fbs: {
    label: 'Fasting Blood Sugar',
    unit: '> 120 mg/dL',
    category: 'Clinical Measurements',
    options: { '0': 'False (<= 120 mg/dL)', '1': 'True (> 120 mg/dL)' },
    description: 'Indicator of fasting blood glucose exceeding 120 mg/dL.',
    tooltip: 'Elevated fasting glucose is a hallmark of insulin resistance and metabolic syndrome, compounding microvascular stress.',
  },
  restecg: {
    label: 'Resting ECG',
    unit: 'category',
    category: 'Cardiac Assessment',
    options: {
      '0': 'Normal',
      '1': 'ST-T Wave Abnormality',
      '2': 'Left Ventricular Hypertrophy',
    },
    description: 'Resting 12-lead electrocardiographic baseline evaluation.',
    tooltip: 'Identifies electrical conduction delays, T-wave inversions, or Estes-criteria voltage criteria for ventricular strain.',
  },
  thalach: {
    label: 'Maximum Heart Rate Achieved',
    unit: 'bpm',
    category: 'Clinical Measurements',
    normalRange: 'Age-predicted max',
    description: 'Peak heart rate achieved during graded treadmill exercise.',
    tooltip: 'Failure to reach expected peak chronotropic target (chronotropic incompetence) strongly correlates with coronary insufficiency.',
  },
  exang: {
    label: 'Exercise-Induced Angina',
    unit: 'binary',
    category: 'Cardiac Assessment',
    options: { '0': 'No', '1': 'Yes' },
    description: 'Symptomatic chest tightness precipitated during physical exertion.',
    tooltip: 'Demonstrates exertional myocardial oxygen supply-demand mismatch characteristic of epicardial stenosis.',
  },
  oldpeak: {
    label: 'ST Depression (Oldpeak)',
    unit: 'mm',
    category: 'Clinical Measurements',
    normalRange: '< 1.0 mm',
    description: 'ST-segment depression induced by exercise relative to resting baseline.',
    tooltip: 'Horizontal or downsloping ST-depression on exercise ECG reflects subendocardial ischemia under hemodynamic challenge.',
  },
  slope: {
    label: 'Slope of Peak Exercise ST',
    unit: 'category',
    category: 'Cardiac Assessment',
    options: {
      '0': 'Upsloping',
      '1': 'Flat',
      '2': 'Downsloping',
    },
    description: 'Geometric slope trajectory of the ST-segment during peak stress.',
    tooltip: 'Flat or downsloping ST-segment morphology is diagnostic of severe reversible myocardial ischemia.',
  },
  ca: {
    label: 'Major Vessels Colored by Fluoroscopy',
    unit: 'count (0–3)',
    category: 'Cardiac Assessment',
    normalRange: '0 vessels',
    description: 'Number of major epicardial arteries (0 to 3) showing significant opacification.',
    tooltip: 'Fluoroscopic coronary angiography highlights lumen narrowing (>=50%) in the main epicardial coronary trunks.',
  },
  thal: {
    label: 'Thallium Stress Scintigraphy',
    unit: 'category',
    category: 'Cardiac Assessment',
    options: {
      '1': 'Normal Perfusion',
      '2': 'Fixed Defect (Infarct/Scar)',
      '3': 'Reversible Defect (Inducible Ischemia)',
    },
    description: 'Nuclear medicine radionuclide myocardial perfusion scan.',
    tooltip: 'Differentiates viable myocardium with reversible ischemia from non-viable fibrotic scar tissue following infarction.',
  },
};

const LOCAL_STORAGE_KEY = 'cardiotwin_assessment_history_v2';
const LATEST_ASSESSMENT_KEY = 'cardiotwin_latest_assessment_v2';

export const apiService = {
  getEvaluationMetrics() {
    return MODEL_EVALUATION_METRICS;
  },

  getAssessmentHistory() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
      return [];
    }
  },

  saveAssessmentToHistory(assessment) {
    try {
      const history = this.getAssessmentHistory();
      const updated = [assessment, ...history.filter(h => h.id !== assessment.id)].slice(0, 50);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LATEST_ASSESSMENT_KEY, JSON.stringify(assessment));
    } catch (e) {
      console.warn('Could not save assessment to localStorage', e);
    }
  },

  getLatestAssessment() {
    try {
      const stored = localStorage.getItem(LATEST_ASSESSMENT_KEY);
      if (stored) return JSON.parse(stored);
      const history = this.getAssessmentHistory();
      return history.length > 0 ? history[0] : null;
    } catch (e) {
      console.warn('Could not read latest assessment', e);
      return null;
    }
  },

  clearAssessmentHistory() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LATEST_ASSESSMENT_KEY);
      return true;
    } catch (e) {
      console.warn('Could not clear history', e);
      return false;
    }
  },

  async predictHeartDisease(patientData) {
    const toNumber = (key) => {
      const value = Number(patientData[key]);
      if (!Number.isFinite(value)) throw new Error(`Please enter a valid value for ${CLINICAL_FEATURE_DEFINITIONS[key]?.label || key}.`);
      return value;
    };
    const payload = {
      age: toNumber('age'), sex: toNumber('sex'), cp: toNumber('cp') + 1,
      trestbps: toNumber('trestbps'), chol: toNumber('chol'), fbs: toNumber('fbs'),
      restecg: toNumber('restecg'), thalach: toNumber('thalach'), exang: toNumber('exang'),
      oldpeak: toNumber('oldpeak'), slope: toNumber('slope') + 1, ca: toNumber('ca'),
      thal: ({ 1: 3, 2: 6, 3: 7 })[toNumber('thal')],
    };
    if (!payload.thal) throw new Error('Please select a valid thal category.');

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/predictions/heart-disease?include_explanation=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error(`Could not reach the CardioTwin API at ${API_BASE_URL}. Start the backend, then try again.`);
    }
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = Array.isArray(body.detail) ? body.detail.map((item) => item.msg).join('; ') : body.detail;
      throw new Error(detail || `Prediction request failed (${response.status}).`);
    }

    const allShapFeatures = (body.explanation || []).map((item) => {
      const definition = CLINICAL_FEATURE_DEFINITIONS[item.feature] || {};
      const rawValue = String(patientData[item.feature] ?? '');
      const displayValue = definition.options?.[rawValue] || rawValue || '—';
      const contribution = Number(item.shap_contribution);
      const direction = contribution > 0 ? 'positive' : contribution < 0 ? 'negative' : 'neutral';
      const target = contribution > 0 ? 'original UCI target 1' : 'original UCI target 0';
      return {
        featureKey: item.feature,
        featureName: definition.label || item.feature,
        valueDisplay: displayValue,
        shapValue: contribution,
        direction,
        clinicalNote: contribution === 0
          ? 'This feature had zero contribution to the displayed decision score for this explanation.'
          : `This contribution moves the model decision score toward ${target}; it does not describe medical causation.`,
      };
    });
    const assessmentResult = {
      id: `CTA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: body.generated_at || new Date().toISOString(),
      modelName: 'Saved Heart Disease SVC Pipeline',
      predictedClass: body.prediction,
      predictedClassLabel: body.label,
      decisionMargin: Number(body.decision_score),
      shortExplanation: `${body.label}. The signed decision score is not a probability or diagnosis.`,
      inputs: { ...patientData },
      allShapFeatures,
      topFiveFeatures: allShapFeatures.slice(0, 5),
      limitations: body.limitations || [],
      explanationNote: body.note || '',
      evaluationSummary: { accuracy: '85.46% ± 3.42% (5-fold CV)', macroF1: '0.8392 ± 0.0369 (5-fold CV)', rocAuc: '0.9046 ± 0.0280 (5-fold CV)' },
    };
    this.saveAssessmentToHistory(assessmentResult);
    return assessmentResult;
  },
};

export default apiService;
