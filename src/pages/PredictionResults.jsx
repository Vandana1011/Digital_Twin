import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Activity, 
  FileSearch, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Layers, 
  X,
  Sparkles,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';
import { apiService, CLINICAL_FEATURE_DEFINITIONS } from '../services/api';

export const PredictionResults = () => {
  const location = useLocation();
  const [assessment] = useState(() => location.state?.assessment || apiService.getLatestAssessment());
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  if (!assessment) {
    return (
      <div className='flex-1 flex flex-col bg-[#040614] py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto w-full text-center space-y-6'>
          <div className='w-16 h-16 rounded-3xl bg-purple-950/50 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-glow-purple'>
            <HeartPulse className='w-8 h-8' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-extrabold text-white'>
              No Active Assessment Results
            </h1>
            <p className='text-sm text-[#9496b8] max-w-md mx-auto'>
              No recent model inference was found in your current session. Enter clinical biomarkers in the assessment form to generate and review model predictions.
            </p>
          </div>
          <div>
            <Button
              to='/predict'
              variant='primary'
              size='lg'
              icon={Sparkles}
              className='shadow-glow-purple rounded-full px-8'
            >
              Start New Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    timestamp,
    predictedClass,
    predictedClassLabel,
    decisionMargin,
    shortExplanation,
    inputs,
    topFiveFeatures,
    evaluationSummary,
  } = assessment;

  const isClass1 = predictedClass === 1;

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-950/60'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <Activity className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                AI Assessment Results
              </h1>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/50 text-purple-300 border border-purple-500/30'>
                Record #{id.slice(0, 8)}
              </span>
            </div>
            <p className='text-xs sm:text-sm text-[#9496b8]'>
              Empirical Support Vector Classifier (SVC) decision boundary and clinical breakdown.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <button
              onClick={() => setShowFullReportModal(true)}
              className='px-4 py-2 rounded-full bg-[#070b24] border border-purple-500/30 hover:border-purple-400 text-purple-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(168,85,247,0.15)]'
            >
              <Printer className='w-4 h-4 text-purple-400' />
              <span>Full Clinical Report</span>
            </button>

            <Button
              to='/predict'
              variant='secondary'
              size='sm'
              icon={RotateCcw}
              className='rounded-full px-4'
            >
              New Assessment
            </Button>

            <Button
              to='/explain'
              variant='primary'
              size='sm'
              icon={FileSearch}
              iconPosition='right'
              className='shadow-glow-purple rounded-full px-5'
            >
              SHAP Explanation
            </Button>
          </div>
        </div>

        <Disclaimer />

        <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden backdrop-blur-xl ${
          isClass1 
            ? 'bg-gradient-to-br from-[#070b24] via-[#150a28] to-[#070b24] border-fuchsia-500/50 shadow-[0_0_35px_rgba(217,70,239,0.25)]'
            : 'bg-gradient-to-br from-[#070b24] via-[#051726] to-[#070b24] border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
        }`}>
          <div 
            className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 ${
              isClass1 ? 'bg-fuchsia-500' : 'bg-emerald-500'
            }`} 
            aria-hidden='true' 
          />

          <div className='relative flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-purple-950/60 mb-6'>
            <div className='space-y-1.5'>
              <div className='flex items-center gap-2 text-xs font-mono text-[#9496b8]'>
                <Clock className='w-3.5 h-3.5 text-purple-400' />
                <span>Recorded: {new Date(timestamp).toLocaleString()}</span>
                <span>•</span>
                <span className='text-purple-300 font-bold'>ID: {id}</span>
              </div>
              <div className='text-xs font-mono text-[#9496b8]'>
                Architecture: <span className='text-slate-200'>Support Vector Classifier (RBF Kernel)</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <span className='px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-navy-950/80 border border-purple-500/30 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.15)]'>
                Hyperplane Margin: {decisionMargin > 0 ? `+${decisionMargin}` : decisionMargin}
              </span>
            </div>
          </div>

          <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
            <div className='lg:col-span-7 space-y-4'>
              <div className='text-xs font-mono uppercase tracking-wider font-bold text-[#9496b8]'>
                Model-Predicted Classification
              </div>

              <div className='flex items-center gap-4'>
                <div className={`p-3.5 rounded-2xl border ${
                  isClass1 
                    ? 'bg-fuchsia-950/50 border-fuchsia-500/50 text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.35)]' 
                    : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                }`}>
                  {isClass1 ? (
                    <AlertTriangle className='w-8 h-8' />
                  ) : (
                    <CheckCircle2 className='w-8 h-8' />
                  )}
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                    {isClass1 ? 'Class 1: Presence of Heart Disease' : 'Class 0: Absence of Heart Disease'}
                  </h2>
                  <div className='text-xs font-mono text-slate-300 mt-1'>
                    {isClass1 
                      ? 'Mapped to original UCI target values 1, 2, 3, or 4 (>=50% diameter stenosis in major vessels)'
                      : 'Mapped to original UCI target value 0 (<50% diameter stenosis in major vessels)'}
                  </div>
                </div>
              </div>

              <p className='text-sm text-slate-300 leading-relaxed max-w-2xl'>
                {shortExplanation}
              </p>

              <div className='p-3.5 rounded-2xl bg-navy-950/80 border border-purple-500/20 text-xs text-[#9496b8] flex items-start gap-2.5'>
                <Info className='w-4 h-4 text-purple-400 shrink-0 mt-0.5' />
                <span>
                  <strong className='text-slate-200'>Clinical Notice:</strong> This output represents an empirical machine learning classification based on the 13 provided clinical variables. It does not constitute a clinical diagnosis, an estimate of disease severity, or a personal prognosis.
                </span>
              </div>
            </div>

            <div className='lg:col-span-5 bg-navy-950/70 rounded-3xl p-6 border border-purple-500/20 space-y-3 font-mono text-xs shadow-card-glow'>
              <div className='text-[11px] font-bold text-purple-300 uppercase tracking-wider pb-2 border-b border-purple-950/60 flex items-center justify-between'>
                <span>Model Evaluation Reference</span>
                <ShieldCheck className='w-4 h-4 text-emerald-400' />
              </div>
              <div className='flex justify-between py-1 border-b border-purple-950/40'>
                <span className='text-[#9496b8]'>Validation Split:</span>
                <span className='text-slate-200'>UCI Hold-Out (N=61)</span>
              </div>
              <div className='flex justify-between py-1 border-b border-purple-950/40'>
                <span className='text-[#9496b8]'>Overall Test Accuracy:</span>
                <span className='text-purple-300 font-bold'>{evaluationSummary.accuracy}</span>
              </div>
              <div className='flex justify-between py-1 border-b border-purple-950/40'>
                <span className='text-[#9496b8]'>Macro F1-Score:</span>
                <span className='text-slate-200 font-bold'>{evaluationSummary.macroF1}</span>
              </div>
              <div className='flex justify-between py-1'>
                <span className='text-[#9496b8]'>ROC-AUC:</span>
                <span className='text-electric-blue font-bold'>{evaluationSummary.rocAuc}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-950/60'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <FileSearch className='w-4 h-4 text-purple-400' />
                <span>Primary Influential Features (SHAP Attribution Preview)</span>
              </h2>
              <p className='text-xs text-[#9496b8] mt-0.5'>
                Top features with the greatest directional contribution toward this prediction.
              </p>
            </div>
            <Link
              to='/explain'
              className='text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 font-mono transition-colors'
            >
              <span>Inspect Full SHAP Waterfall</span>
              <TrendingUp className='w-3.5 h-3.5' />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 font-mono'>
            {topFiveFeatures.map((feat, idx) => {
              const isPositive = feat.direction === 'positive';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isPositive 
                      ? 'bg-fuchsia-950/20 border-fuchsia-500/30' 
                      : 'bg-blue-950/20 border-blue-500/30'
                  } space-y-2`}
                >
                  <div className='flex items-center justify-between'>
                    <span className='text-[10px] text-[#9496b8] uppercase tracking-wider font-bold'>
                      Rank #{idx + 1}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      isPositive ? 'text-fuchsia-400' : 'text-electric-blue'
                    }`}>
                      {isPositive ? <TrendingUp className='w-3 h-3' /> : <TrendingDown className='w-3 h-3' />}
                      <span>{isPositive ? `+${feat.shapValue}` : feat.shapValue}</span>
                    </span>
                  </div>

                  <div>
                    <div className='text-xs font-bold text-white font-sans truncate' title={feat.featureName}>
                      {feat.featureName}
                    </div>
                    <div className='text-[11px] text-slate-300 mt-0.5'>
                      Value: <span className='text-purple-300 font-bold'>{feat.valueDisplay}</span>
                    </div>
                  </div>

                  <p className='text-[10px] text-[#9496b8] font-sans leading-tight line-clamp-2'>
                    {feat.clinicalNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex items-center justify-between pb-3 border-b border-purple-950/60'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <Layers className='w-4 h-4 text-purple-400' />
                <span>Summary of Patient Clinical Inputs (13 Features)</span>
              </h2>
              <p className='text-xs text-[#9496b8] mt-0.5'>
                Values entered for this assessment against standard reference thresholds.
              </p>
            </div>
            <Link
              to='/predict'
              className='text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1'
            >
              <span>Modify Inputs</span>
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs'>
            {Object.entries(inputs).map(([key, value]) => {
              const def = CLINICAL_FEATURE_DEFINITIONS[key] || {};
              const displayVal = def.options ? (def.options[String(value)] || value) : value;
              return (
                <div key={key} className='p-3.5 rounded-2xl bg-navy-950/70 border border-purple-500/15 flex items-center justify-between gap-3'>
                  <div>
                    <div className='text-[11px] text-[#9496b8] font-sans'>{def.label || key}</div>
                    <div className='font-bold text-slate-200 mt-0.5'>
                      {String(displayVal)} {def.unit && def.unit !== 'category' && def.unit !== 'binary' && def.unit !== 'scale (0–3)' ? def.unit : ''}
                    </div>
                  </div>
                  {def.normalRange && (
                    <span className='text-[10px] text-purple-300/80 bg-[#070b24] px-2 py-0.5 rounded-lg border border-purple-500/20'>
                      Ref: {def.normalRange}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className='pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-950/60'>
          <Button
            to='/predict'
            variant='secondary'
            size='md'
            icon={RotateCcw}
            className='rounded-full px-6'
          >
            Start New Assessment
          </Button>

          <div className='flex items-center gap-3'>
            <Button
              to='/explain'
              variant='primary'
              size='md'
              icon={FileSearch}
              iconPosition='right'
              className='shadow-glow-purple rounded-full px-6'
            >
              Examine SHAP Explanations
            </Button>
          </div>
        </div>
      </div>

      {showFullReportModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto'>
          <div className='relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 bg-[#070b24] border border-purple-500/40 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between pb-4 border-b border-purple-950/60'>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-xl bg-purple-950/50 text-purple-400 border border-purple-500/40 shadow-glow-purple'>
                  <HeartPulse className='w-5 h-5' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-white'>
                    Clinical Assessment Summary Report
                  </h3>
                  <p className='text-xs font-mono text-[#9496b8]'>
                    Record: {id} • Generated: {new Date(timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFullReportModal(false)}
                className='p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-purple-950/40 transition-colors'
                aria-label='Close modal'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='space-y-6 text-sm text-slate-300'>
              <div className='p-4 rounded-2xl bg-navy-950 border border-purple-500/25'>
                <div className='text-xs font-mono text-[#9496b8] uppercase tracking-wider mb-1'>
                  Model-Predicted Class
                </div>
                <div className={`text-xl font-bold font-sans ${isClass1 ? 'text-fuchsia-400' : 'text-emerald-400'}`}>
                  {predictedClassLabel}
                </div>
                <div className='text-xs text-[#9496b8] mt-1 font-mono'>
                  Decision Margin: {decisionMargin} • Classifier: Support Vector Machine (RBF)
                </div>
              </div>

              <div>
                <h4 className='text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2'>
                  Input Biomarker Matrix
                </h4>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs'>
                  {Object.entries(inputs).map(([key, val]) => {
                    const def = CLINICAL_FEATURE_DEFINITIONS[key] || {};
                    const display = def.options ? (def.options[String(val)] || val) : val;
                    return (
                      <div key={key} className='p-2.5 rounded-xl bg-navy-950/80 border border-purple-500/15'>
                        <span className='text-[10px] text-[#9496b8] block font-sans'>{def.label || key}</span>
                        <span className='font-bold text-slate-200'>{String(display)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className='text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2'>
                  Top Contributing SHAP Features
                </h4>
                <div className='space-y-2 font-mono text-xs'>
                  {topFiveFeatures.map((f, i) => (
                    <div key={i} className='p-3 rounded-xl bg-navy-950/80 border border-purple-500/15 flex justify-between items-center'>
                      <div>
                        <span className='font-bold text-slate-200 font-sans'>{f.featureName}</span>
                        <span className='text-[#9496b8] text-[11px] block'>{f.clinicalNote}</span>
                      </div>
                      <span className={`font-bold ${f.shapValue > 0 ? 'text-fuchsia-400' : 'text-electric-blue'}`}>
                        {f.shapValue > 0 ? `+${f.shapValue}` : f.shapValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='p-4 rounded-2xl bg-[#070b24] border border-purple-500/30 text-xs text-slate-300 leading-relaxed'>
                <strong className='text-purple-300'>Research Prototype Notice:</strong> CardioTwin AI is developed strictly for research, educational, and computational evaluation purposes. It is not an FDA-cleared or CE-marked medical device and cannot be utilized as a substitute for professional clinical judgment, diagnostic testing, or coronary angiography.
              </div>
            </div>

            <div className='pt-4 border-t border-purple-950/60 flex items-center justify-between'>
              <button
                onClick={handlePrint}
                className='px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-2 hover:bg-purple-900/50 transition-colors'
              >
                <Printer className='w-4 h-4 text-purple-400' />
                <span>Print Report</span>
              </button>

              <button
                onClick={() => setShowFullReportModal(false)}
                className='px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-purple transition-all'
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionResults;
