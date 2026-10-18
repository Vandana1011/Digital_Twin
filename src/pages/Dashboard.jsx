import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Activity, 
  BarChart3, 
  Cpu, 
  FileSearch, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Database, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';
import { apiService, MODEL_EVALUATION_METRICS } from '../services/api';

export const Dashboard = () => {
  const [assessmentHistory] = useState(() => apiService.getAssessmentHistory());

  const workflowStages = [
    {
      num: 1,
      title: 'Clinical Inputs',
      desc: '13 standardized biomarkers (demographics, blood pressure, ECG, ST depression)',
      icon: Database,
      accent: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      num: 2,
      title: 'Data Preprocessing',
      desc: 'StandardScaler feature normalization and categorical alignment',
      icon: Layers,
      accent: 'text-teal-400',
      border: 'border-teal-500/30',
      bg: 'bg-teal-500/10',
    },
    {
      num: 3,
      title: 'Existing SVC Model',
      desc: 'Support Vector Classifier with RBF kernel computing hyperplane distance',
      icon: Cpu,
      accent: 'text-electric-purple',
      border: 'border-electric-purple/30',
      bg: 'bg-electric-purple/10',
    },
    {
      num: 4,
      title: 'Predicted Class',
      desc: 'Binary classification (Class 0: Absence vs Class 1: Presence)',
      icon: Activity,
      accent: 'text-electric-pink',
      border: 'border-electric-pink/30',
      bg: 'bg-electric-pink/10',
    },
    {
      num: 5,
      title: 'SHAP Explanation',
      desc: 'Additive feature attribution detailing directional biomarker impact',
      icon: FileSearch,
      accent: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div className='flex-1 flex flex-col bg-navy-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        {/* Top Header & Welcome Message */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
                <Cpu className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Clinical Intelligence Dashboard
              </h1>
              <span className='px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'>
                Model v1.0
              </span>
            </div>
            <p className='text-sm text-slate-400 max-w-2xl'>
              Welcome to the CardioTwin AI clinical intelligence portal. Inspect saved model evaluation metrics, explore the complete machine learning workflow, and evaluate clinical cases with explainable feature attributions.
            </p>
          </div>

          <div className='flex items-center gap-3 shrink-0'>
            <Button
              to='/assessment'
              variant='primary'
              size='md'
              icon={Sparkles}
              className='shadow-glow-cyan'
            >
              Start New Assessment
            </Button>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <Disclaimer variant='banner' />

        {/* Model Evaluation Metrics Section */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <span>Saved Model Evaluation Results</span>
                <span className='text-[10px] font-mono text-slate-400 bg-navy-900 border border-slate-800 px-2 py-0.5 rounded font-normal'>
                  Hold-Out Test Split (N = 61)
                </span>
              </h2>
              <p className='text-xs text-slate-400 mt-0.5'>
                Metrics represent empirical performance on the benchmark evaluation split, not guaranteed real-world clinical efficacy.
              </p>
            </div>
            <Link
              to='/performance'
              className='text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1'
            >
              <span>Full Performance Analysis</span>
              <ArrowRight className='w-3.5 h-3.5' />
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Accuracy */}
            <div className='rounded-2xl p-5 bg-navy-900/90 border border-slate-800 shadow-card-glow hover:border-cyan-500/30 transition-all'>
              <div className='flex items-center justify-between text-xs text-slate-400 mb-2'>
                <span className='font-medium'>Classification Accuracy</span>
                <span className='p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'>
                  <CheckCircle2 className='w-4 h-4' />
                </span>
              </div>
              <div className='text-3xl font-extrabold text-white font-mono tracking-tight'>
                {MODEL_EVALUATION_METRICS.accuracy}%
              </div>
              <p className='text-[11px] text-slate-400 mt-2'>
                54 of 61 test samples correctly classified in binary evaluation.
              </p>
            </div>

            {/* Macro F1-score */}
            <div className='rounded-2xl p-5 bg-navy-900/90 border border-slate-800 shadow-card-glow hover:border-emerald-500/30 transition-all'>
              <div className='flex items-center justify-between text-xs text-slate-400 mb-2'>
                <span className='font-medium'>Macro F1-Score</span>
                <span className='p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                  <BarChart3 className='w-4 h-4' />
                </span>
              </div>
              <div className='text-3xl font-extrabold text-white font-mono tracking-tight'>
                {MODEL_EVALUATION_METRICS.macroF1}
              </div>
              <p className='text-[11px] text-slate-400 mt-2'>
                Harmonic mean balancing precision and recall across both classes.
              </p>
            </div>

            {/* ROC-AUC */}
            <div className='rounded-2xl p-5 bg-navy-900/90 border border-slate-800 shadow-card-glow hover:border-electric-purple/40 transition-all'>
              <div className='flex items-center justify-between text-xs text-slate-400 mb-2'>
                <span className='font-medium'>ROC-AUC Metric</span>
                <span className='p-1.5 rounded-lg bg-electric-purple/15 text-electric-purple border border-electric-purple/30'>
                  <Activity className='w-4 h-4' />
                </span>
              </div>
              <div className='text-3xl font-extrabold text-white font-mono tracking-tight text-electric-purple'>
                {MODEL_EVALUATION_METRICS.rocAuc}
              </div>
              <p className='text-[11px] text-slate-400 mt-2'>
                High discriminative capacity across decision threshold sweeps.
              </p>
            </div>

            {/* Evaluation Samples */}
            <div className='rounded-2xl p-5 bg-navy-900/90 border border-slate-800 shadow-card-glow hover:border-slate-700 transition-all'>
              <div className='flex items-center justify-between text-xs text-slate-400 mb-2'>
                <span className='font-medium'>Evaluation Samples</span>
                <span className='p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700'>
                  <Database className='w-4 h-4' />
                </span>
              </div>
              <div className='text-3xl font-extrabold text-white font-mono tracking-tight'>
                {MODEL_EVALUATION_METRICS.sampleSize}
              </div>
              <p className='text-[11px] text-slate-400 mt-2'>
                Hold-out test records (20% split of 303 UCI Cleveland subjects).
              </p>
            </div>
          </div>
        </div>

        {/* Visual Model Workflow Overview */}
        <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow'>
          <div className='flex items-center justify-between mb-6 pb-3 border-b border-slate-800'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <span>End-to-End Model Workflow</span>
                <span className='text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20'>
                  5 Stages
                </span>
              </h2>
              <p className='text-xs text-slate-400 mt-0.5'>
                How patient clinical features transition through preprocessing, SVC inference, and SHAP explainability.
              </p>
            </div>
            <Link
              to='/how-it-works'
              className='text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1'
            >
              <span>Workflow Details</span>
              <ArrowRight className='w-3.5 h-3.5' />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
            {workflowStages.map((stage) => {
              const StageIcon = stage.icon;
              return (
                <div 
                  key={stage.num}
                  className='rounded-xl p-4 bg-navy-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2'
                >
                  <div className='flex items-center justify-between'>
                    <span className={`w-6 h-6 rounded-lg ${stage.bg} ${stage.border} border flex items-center justify-center text-xs font-mono font-bold ${stage.accent}`}>
                      {stage.num}
                    </span>
                    <StageIcon className={`w-4 h-4 ${stage.accent}`} />
                  </div>
                  <div className='font-bold text-xs text-slate-200 font-sans'>
                    {stage.title}
                  </div>
                  <p className='text-[11px] text-slate-400 leading-relaxed font-sans'>
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick-Access Cards */}
        <div>
          <h2 className='text-base font-bold text-white tracking-tight mb-4'>
            Explore CardioTwin AI Modules
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* 1. Heart Assessment */}
            <Link
              to='/assessment'
              className='group rounded-2xl p-5 bg-navy-900/80 border border-slate-800 hover:border-rose-500/40 hover:bg-navy-850/80 transition-all shadow-card-glow'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform'>
                  <HeartPulse className='w-5 h-5' />
                </div>
                <ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors' />
              </div>
              <h3 className='text-sm font-bold text-white group-hover:text-rose-300 transition-colors'>
                Heart Assessment
              </h3>
              <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                Enter patient clinical profile, laboratory measurements, and cardiac stress markers.
              </p>
              <div className='mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-rose-400 font-semibold'>
                13 Clinical Inputs →
              </div>
            </Link>

            {/* 2. Prediction Results */}
            <Link
              to='/results'
              className='group rounded-2xl p-5 bg-navy-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-navy-850/80 transition-all shadow-card-glow'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform'>
                  <Activity className='w-5 h-5' />
                </div>
                <ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors' />
              </div>
              <h3 className='text-sm font-bold text-white group-hover:text-cyan-300 transition-colors'>
                Prediction Results
              </h3>
              <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                Inspect the model-predicted binary class, decision margin, and clinical parameter summary.
              </p>
              <div className='mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 font-semibold'>
                Class 0 / Class 1 Output →
              </div>
            </Link>

            {/* 3. SHAP Explanation */}
            <Link
              to='/shap'
              className='group rounded-2xl p-5 bg-navy-900/80 border border-slate-800 hover:border-electric-purple/40 hover:bg-navy-850/80 transition-all shadow-card-glow'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='p-2 rounded-xl bg-electric-purple/15 text-electric-purple border border-electric-purple/30 group-hover:scale-105 transition-transform'>
                  <FileSearch className='w-5 h-5' />
                </div>
                <ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-electric-purple transition-colors' />
              </div>
              <h3 className='text-sm font-bold text-white group-hover:text-purple-300 transition-colors'>
                SHAP Explanation
              </h3>
              <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                Analyze horizontal bar contributions to understand which features drove the classification.
              </p>
              <div className='mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-electric-purple font-semibold'>
                Why This Prediction? →
              </div>
            </Link>

            {/* 4. Model Performance */}
            <Link
              to='/performance'
              className='group rounded-2xl p-5 bg-navy-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-navy-850/80 transition-all shadow-card-glow'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform'>
                  <BarChart3 className='w-5 h-5' />
                </div>
                <ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors' />
              </div>
              <h3 className='text-sm font-bold text-white group-hover:text-emerald-300 transition-colors'>
                Model Performance
              </h3>
              <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                Review the 2x2 confusion matrix, ROC curve, cross-validation folds, and research limitations.
              </p>
              <div className='mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 font-semibold'>
                Confusion Matrix & ROC →
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Assessment History Section (Actual Saved Records Only) */}
        <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow'>
          <div className='flex items-center justify-between mb-4 pb-3 border-b border-slate-800'>
            <div className='flex items-center gap-2'>
              <Clock className='w-4 h-4 text-cyan-400' />
              <h2 className='text-base font-bold text-white tracking-tight'>
                Recent Assessment History
              </h2>
            </div>
            {assessmentHistory.length > 0 && (
              <Link
                to='/history'
                className='text-xs font-semibold text-cyan-400 hover:text-cyan-300'
              >
                View Full History ({assessmentHistory.length})
              </Link>
            )}
          </div>

          {assessmentHistory.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-xs' aria-label='Saved assessment history'>
                <thead className='border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider'>
                  <tr>
                    <th className='py-3 px-4'>Assessment ID</th>
                    <th className='py-3 px-4'>Date / Time</th>
                    <th className='py-3 px-4'>Patient Info</th>
                    <th className='py-3 px-4'>Model-Predicted Class</th>
                    <th className='py-3 px-4'>Key Driver</th>
                    <th className='py-3 px-4 text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-800/60 font-mono'>
                  {assessmentHistory.slice(0, 5).map((item) => (
                    <tr key={item.id} className='hover:bg-white/5 transition-colors'>
                      <td className='py-3 px-4 font-bold text-cyan-300'>
                        {item.id}
                      </td>
                      <td className='py-3 px-4 text-slate-400'>
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className='py-3 px-4 text-slate-300 font-sans'>
                        {item.inputs.age} yrs • {item.inputs.sex === '1' ? 'Male' : 'Female'}
                      </td>
                      <td className='py-3 px-4'>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-sans font-bold ${
                          item.predictedClass === 1
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {item.predictedClass === 1 ? 'Class 1 (Presence)' : 'Class 0 (Absence)'}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-slate-400 font-sans'>
                        {item.topFiveFeatures?.[0]?.featureName || 'N/A'} ({item.topFiveFeatures?.[0]?.shapValue > 0 ? '+' : ''}{item.topFiveFeatures?.[0]?.shapValue})
                      </td>
                      <td className='py-3 px-4 text-right'>
                        <Link
                          to='/results'
                          onClick={() => apiService.saveAssessmentToHistory(item)}
                          className='text-xs font-sans text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1'
                        >
                          <span>Review</span>
                          <ArrowRight className='w-3 h-3' />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='py-10 text-center space-y-3'>
              <div className='w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto'>
                <Info className='w-5 h-5' />
              </div>
              <div className='space-y-1 max-w-sm mx-auto'>
                <h4 className='text-sm font-semibold text-slate-200'>
                  No previous assessments yet
                </h4>
                <p className='text-xs text-slate-400 leading-relaxed'>
                  CardioTwin AI does not fabricate fake patient activity. Run your first clinical evaluation using the assessment form to save and review evaluation history.
                </p>
              </div>
              <div className='pt-2'>
                <Button
                  to='/assessment'
                  variant='primary'
                  size='sm'
                  icon={Sparkles}
                >
                  Run First Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
