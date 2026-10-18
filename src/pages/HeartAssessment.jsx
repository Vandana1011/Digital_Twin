import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  User, 
  Activity, 
  Stethoscope, 
  AlertCircle,
  Bookmark
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';
import { apiService, CLINICAL_FEATURE_DEFINITIONS } from '../services/api';

const defaultFormValues = {
  age: 54,
  sex: '1',
  cp: '0',
  trestbps: 130,
  chol: 240,
  fbs: '0',
  restecg: '0',
  thalach: 150,
  exang: '0',
  oldpeak: 1.0,
  slope: '0',
  ca: 0,
  thal: '1',
};

const samplePresets = {
  class1Positive: {
    label: 'Sample Case: Presence (Class 1)',
    description: '62 y/o male, exertional angina, 2.5mm ST depression, 2 vessels',
    data: {
      age: 62,
      sex: '1',
      cp: '3', // Asymptomatic / silent ischemia
      trestbps: 155,
      chol: 284,
      fbs: '1',
      restecg: '1',
      thalach: 112,
      exang: '1',
      oldpeak: 2.5,
      slope: '1', // flat
      ca: 2,
      thal: '3', // reversible defect
    },
  },
  class0Negative: {
    label: 'Sample Case: Absence (Class 0)',
    description: '44 y/o female, atypical discomfort, clean vessels, normal ECG',
    data: {
      age: 44,
      sex: '0',
      cp: '1', // atypical
      trestbps: 118,
      chol: 182,
      fbs: '0',
      restecg: '0',
      thalach: 172,
      exang: '0',
      oldpeak: 0.2,
      slope: '0', // upsloping
      ca: 0,
      thal: '1', // normal
    },
  },
  borderline: {
    label: 'Sample Case: Borderline Hyperplane',
    description: '55 y/o male, moderate cholesterol, mild ST-T changes',
    data: {
      age: 55,
      sex: '1',
      cp: '2',
      trestbps: 136,
      chol: 242,
      fbs: '0',
      restecg: '1',
      thalach: 142,
      exang: '0',
      oldpeak: 1.1,
      slope: '1',
      ca: 1,
      thal: '2',
    },
  },
};

export const HeartAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActivePreset(null);
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const loadPreset = (presetKey) => {
    setFormData(samplePresets[presetKey].data);
    setActivePreset(presetKey);
    setErrors({});
  };

  const clearForm = () => {
    setFormData(defaultFormValues);
    setActivePreset(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    const age = Number(formData.age);
    if (isNaN(age) || age < 18 || age > 100) {
      newErrors.age = 'Age must be between 18 and 100 years.';
    }

    const trestbps = Number(formData.trestbps);
    if (isNaN(trestbps) || trestbps < 70 || trestbps > 240) {
      newErrors.trestbps = 'Resting BP must be between 70 and 240 mmHg.';
    }

    const chol = Number(formData.chol);
    if (isNaN(chol) || chol < 90 || chol > 600) {
      newErrors.chol = 'Cholesterol must be between 90 and 600 mg/dL.';
    }

    const thalach = Number(formData.thalach);
    if (isNaN(thalach) || thalach < 60 || thalach > 230) {
      newErrors.thalach = 'Heart rate must be between 60 and 230 bpm.';
    }

    const oldpeak = Number(formData.oldpeak);
    if (isNaN(oldpeak) || oldpeak < 0 || oldpeak > 7.0) {
      newErrors.oldpeak = 'Oldpeak ST depression must be between 0.0 and 7.0 mm.';
    }

    const ca = Number(formData.ca);
    if (isNaN(ca) || ca < 0 || ca > 3) {
      newErrors.ca = 'Vessel count must be between 0 and 3.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await apiService.predictHeartDisease(formData);
      navigate('/results', { state: { assessment: result } });
    } catch (err) {
      console.error('Error generating prediction:', err);
      setErrors({ form: 'An error occurred during model inference. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Helper tooltip renderer
  const renderTooltip = (key) => {
    const def = CLINICAL_FEATURE_DEFINITIONS[key];
    if (!def) return null;
    return (
      <div className='relative inline-block ml-1.5'>
        <button
          type='button'
          onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
          onMouseEnter={() => setActiveTooltip(key)}
          onMouseLeave={() => setActiveTooltip(null)}
          className='text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none'
          aria-label={`Info about ${def.label}`}
        >
          <HelpCircle className='w-3.5 h-3.5' />
        </button>

        {activeTooltip === key && (
          <div className='absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-200 text-xs shadow-2xl backdrop-blur-xl'>
            <div className='font-bold text-cyan-300 mb-1'>{def.label}</div>
            <p className='text-[11px] text-slate-300 leading-relaxed'>{def.tooltip}</p>
            {def.normalRange && (
              <div className='mt-1 text-[10px] font-mono text-slate-400'>
                Ref: <span className='text-emerald-400'>{def.normalRange}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex-1 flex flex-col bg-navy-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        {/* Top Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400'>
                <HeartPulse className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                New Heart Assessment
              </h1>
            </div>
            <p className='text-xs sm:text-sm text-slate-400'>
              Provide the 13 clinical biomarkers required by the Support Vector Classifier (SVC) model.
            </p>
          </div>

          {/* Quick Presets for Evaluators */}
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-xs font-mono text-slate-400 flex items-center gap-1'>
              <Bookmark className='w-3.5 h-3.5 text-cyan-400' />
              <span>Presets:</span>
            </span>
            {Object.entries(samplePresets).map(([key, item]) => (
              <button
                key={key}
                type='button'
                onClick={() => loadPreset(key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-sans transition-colors ${
                  activePreset === key
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/50 font-semibold'
                    : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
                title={item.description}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer variant='banner' />

        {errors.form && (
          <div className='p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2'>
            <AlertCircle className='w-4 h-4 text-rose-400 shrink-0' />
            <span>{errors.form}</span>
          </div>
        )}

        {/* The 13 Features Organized in 3 Clean Cards */}
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
            
            {/* Card A: Patient Profile */}
            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-5'>
              <div className='flex items-center gap-2.5 pb-3 border-b border-slate-800'>
                <div className='p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'>
                  <User className='w-4 h-4' />
                </div>
                <div>
                  <h2 className='text-sm font-bold text-white tracking-tight'>
                    A. Patient Profile
                  </h2>
                  <p className='text-[11px] text-slate-400'>
                    Demographic baseline characteristics
                  </p>
                </div>
              </div>

              {/* Age */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='age' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Age</span>
                    {renderTooltip('age')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>years</span>
                </div>
                <input
                  id='age'
                  type='number'
                  min='18'
                  max='100'
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full bg-navy-950 border ${errors.age ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono`}
                  required
                />
                {errors.age && (
                  <p className='text-[10px] text-rose-400 mt-1'>{errors.age}</p>
                )}
              </div>

              {/* Biological Sex */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='sex' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Biological Sex</span>
                    {renderTooltip('sex')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>binary</span>
                </div>
                <select
                  id='sex'
                  value={formData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='1'>Male (1)</option>
                  <option value='0'>Female (0)</option>
                </select>
              </div>

              <div className='p-3 rounded-xl bg-navy-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1'>
                <span className='font-semibold text-slate-300 block'>Privacy Notice:</span>
                <p>CardioTwin AI strictly requires only physiological values. No identifying patient names or numbers are stored.</p>
              </div>
            </div>

            {/* Card B: Clinical Measurements */}
            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-5'>
              <div className='flex items-center gap-2.5 pb-3 border-b border-slate-800'>
                <div className='p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20'>
                  <Activity className='w-4 h-4' />
                </div>
                <div>
                  <h2 className='text-sm font-bold text-white tracking-tight'>
                    B. Clinical Measurements
                  </h2>
                  <p className='text-[11px] text-slate-400'>
                    Vital signs and laboratory biomarkers
                  </p>
                </div>
              </div>

              {/* Resting Blood Pressure */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='trestbps' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Resting Blood Pressure</span>
                    {renderTooltip('trestbps')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>mmHg</span>
                </div>
                <input
                  id='trestbps'
                  type='number'
                  min='70'
                  max='240'
                  value={formData.trestbps}
                  onChange={(e) => handleInputChange('trestbps', e.target.value)}
                  className={`w-full bg-navy-950 border ${errors.trestbps ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono`}
                  required
                />
                {errors.trestbps && (
                  <p className='text-[10px] text-rose-400 mt-1'>{errors.trestbps}</p>
                )}
              </div>

              {/* Serum Cholesterol */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='chol' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Serum Cholesterol</span>
                    {renderTooltip('chol')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>mg/dL</span>
                </div>
                <input
                  id='chol'
                  type='number'
                  min='90'
                  max='600'
                  value={formData.chol}
                  onChange={(e) => handleInputChange('chol', e.target.value)}
                  className={`w-full bg-navy-950 border ${errors.chol ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono`}
                  required
                />
                {errors.chol && (
                  <p className='text-[10px] text-rose-400 mt-1'>{errors.chol}</p>
                )}
              </div>

              {/* Fasting Blood Sugar Indicator */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='fbs' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Fasting Blood Sugar</span>
                    {renderTooltip('fbs')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>&gt; 120 mg/dL</span>
                </div>
                <select
                  id='fbs'
                  value={formData.fbs}
                  onChange={(e) => handleInputChange('fbs', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='0'>False (&le; 120 mg/dL)</option>
                  <option value='1'>True (&gt; 120 mg/dL)</option>
                </select>
              </div>

              {/* Maximum Heart Rate Achieved */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='thalach' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Maximum Heart Rate</span>
                    {renderTooltip('thalach')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>bpm</span>
                </div>
                <input
                  id='thalach'
                  type='number'
                  min='60'
                  max='230'
                  value={formData.thalach}
                  onChange={(e) => handleInputChange('thalach', e.target.value)}
                  className={`w-full bg-navy-950 border ${errors.thalach ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono`}
                  required
                />
                {errors.thalach && (
                  <p className='text-[10px] text-rose-400 mt-1'>{errors.thalach}</p>
                )}
              </div>

              {/* Oldpeak ST Depression */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='oldpeak' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>ST Depression (Oldpeak)</span>
                    {renderTooltip('oldpeak')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>mm</span>
                </div>
                <input
                  id='oldpeak'
                  type='number'
                  step='0.1'
                  min='0'
                  max='7.0'
                  value={formData.oldpeak}
                  onChange={(e) => handleInputChange('oldpeak', e.target.value)}
                  className={`w-full bg-navy-950 border ${errors.oldpeak ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono`}
                  required
                />
                {errors.oldpeak && (
                  <p className='text-[10px] text-rose-400 mt-1'>{errors.oldpeak}</p>
                )}
              </div>
            </div>

            {/* Card C: Cardiac Assessment */}
            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-5'>
              <div className='flex items-center gap-2.5 pb-3 border-b border-slate-800'>
                <div className='p-1.5 rounded-lg bg-electric-purple/15 text-electric-purple border border-electric-purple/30'>
                  <Stethoscope className='w-4 h-4' />
                </div>
                <div>
                  <h2 className='text-sm font-bold text-white tracking-tight'>
                    C. Cardiac Assessment
                  </h2>
                  <p className='text-[11px] text-slate-400'>
                    Stress test, ECG, and vessel imaging
                  </p>
                </div>
              </div>

              {/* Chest Pain Type */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='cp' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Chest Pain Type (CP)</span>
                    {renderTooltip('cp')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>0–3</span>
                </div>
                <select
                  id='cp'
                  value={formData.cp}
                  onChange={(e) => handleInputChange('cp', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='0'>Typical Angina (0)</option>
                  <option value='1'>Atypical Angina (1)</option>
                  <option value='2'>Non-Anginal Pain (2)</option>
                  <option value='3'>Asymptomatic (3)</option>
                </select>
              </div>

              {/* Resting ECG */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='restecg' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Resting ECG</span>
                    {renderTooltip('restecg')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>category</span>
                </div>
                <select
                  id='restecg'
                  value={formData.restecg}
                  onChange={(e) => handleInputChange('restecg', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='0'>Normal (0)</option>
                  <option value='1'>ST-T Wave Abnormality (1)</option>
                  <option value='2'>Left Ventricular Hypertrophy (2)</option>
                </select>
              </div>

              {/* Exercise-Induced Angina */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='exang' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Exercise-Induced Angina</span>
                    {renderTooltip('exang')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>binary</span>
                </div>
                <select
                  id='exang'
                  value={formData.exang}
                  onChange={(e) => handleInputChange('exang', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='0'>No (0)</option>
                  <option value='1'>Yes (1)</option>
                </select>
              </div>

              {/* Slope */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='slope' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Slope of Peak ST</span>
                    {renderTooltip('slope')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>category</span>
                </div>
                <select
                  id='slope'
                  value={formData.slope}
                  onChange={(e) => handleInputChange('slope', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='0'>Upsloping (0)</option>
                  <option value='1'>Flat (1)</option>
                  <option value='2'>Downsloping (2)</option>
                </select>
              </div>

              {/* Number of Major Vessels (CA) */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='ca' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Major Vessels (CA)</span>
                    {renderTooltip('ca')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>0–3 vessels</span>
                </div>
                <select
                  id='ca'
                  value={formData.ca}
                  onChange={(e) => handleInputChange('ca', Number(e.target.value))}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-mono'
                >
                  <option value='0'>0 vessels</option>
                  <option value='1'>1 vessel</option>
                  <option value='2'>2 vessels</option>
                  <option value='3'>3 vessels</option>
                </select>
              </div>

              {/* Thal (Thallium Scintigraphy) */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label htmlFor='thal' className='text-xs font-medium text-slate-200 flex items-center'>
                    <span>Thallium Stress (Thal)</span>
                    {renderTooltip('thal')}
                  </label>
                  <span className='text-[10px] font-mono text-slate-400'>category</span>
                </div>
                <select
                  id='thal'
                  value={formData.thal}
                  onChange={(e) => handleInputChange('thal', e.target.value)}
                  className='w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:outline-none'
                >
                  <option value='1'>Normal (1)</option>
                  <option value='2'>Fixed Defect (2)</option>
                  <option value='3'>Reversible Defect (3)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className='pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <button
              type='button'
              onClick={clearForm}
              className='inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-800/60'
            >
              <RotateCcw className='w-4 h-4' />
              <span>Clear Form</span>
            </button>

            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <Button
                type='submit'
                variant='primary'
                size='lg'
                loading={loading}
                icon={Sparkles}
                className='w-full sm:w-auto shadow-glow-cyan'
              >
                {loading ? 'Running SVC Inference...' : 'Generate Prediction'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeartAssessment;
