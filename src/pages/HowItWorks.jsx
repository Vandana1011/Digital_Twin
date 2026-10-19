import { useState } from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Activity, 
  FileSearch, 
  ArrowRight, 
  ArrowDown, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';

export const HowItWorks = () => {
  const [selectedStage, setSelectedStage] = useState(1);

  const stages = [
    {
      num: 1,
      title: 'Clinical Inputs',
      subtitle: 'Data Intake & Standardization',
      shortDesc: 'Collection of 13 standardized clinical biomarkers (patient demographics, resting vitals, and stress parameters).',
      icon: Database,
      accent: 'cyan',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-500/10',
      glow: 'shadow-glow-cyan',
      details: [
        'Collects 13 validated cardiovascular indicators from standard clinical evaluations.',
        'Encompasses Patient Profile (Age, Sex), Clinical Measurements (Resting BP, Cholesterol, Fasting Blood Sugar, Max HR, Oldpeak ST depression), and Cardiac Assessments (Chest pain type, Resting ECG, Angina, Slope, Major vessels, Thallium).',
        'Includes range validation ensuring values conform to physiological boundaries.',
      ],
      clinicalContext: 'Mirrors the diagnostic parameters recorded during graded treadmill exercise tolerance testing and coronary fluoroscopy.',
    },
    {
      num: 2,
      title: 'Data Preprocessing',
      subtitle: 'Coordinate Scaling',
      shortDesc: 'Feature scaling and standardization aligning patient metrics with the multidimensional model space.',
      icon: Layers,
      accent: 'teal',
      textColor: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      bgColor: 'bg-teal-500/10',
      glow: 'shadow-glow-teal',
      details: [
        'Applies StandardScaler normalization (zero mean, unit variance) fitted to the training distribution.',
        'Prevents variables with large nominal scales (e.g. cholesterol 240 mg/dL) from dominating variables on smaller scales (e.g. oldpeak 1.5 mm).',
        'Categorical features are transformed to match the model training matrix.',
      ],
      clinicalContext: 'Ensures equal mathematical weighting across diverse clinical units (mmHg, mg/dL, mm, and categorical grades).',
    },
    {
      num: 3,
      title: 'Existing SVC Model',
      subtitle: 'Hyperplane Evaluation',
      shortDesc: 'Support Vector Classifier evaluating the patient vector against a trained decision boundary.',
      icon: Cpu,
      accent: 'purple',
      textColor: 'text-electric-purple',
      borderColor: 'border-electric-purple/40',
      bgColor: 'bg-electric-purple/10',
      glow: 'shadow-glow-purple',
      details: [
        'Uses a Support Vector Classifier (SVC) with a non-linear Radial Basis Function (RBF) kernel.',
        'Maps patient biomarkers into a high-dimensional feature space where healthy and pathological clusters are optimally separated.',
        'Calculates the signed geometric distance (decision margin) from the patient vector to the separating hyperplane.',
      ],
      clinicalContext: 'Evaluated on the UCI Cleveland dataset. Stratified 5-fold cross-validation mean accuracy: 85.46%; mean ROC-AUC: 0.9046. Research prototype only.',
    },
    {
      num: 4,
      title: 'Predicted Class',
      subtitle: 'Binary Classification',
      shortDesc: 'Binary classification assigning the patient to Class 0 (Absence) or Class 1 (Presence of CAD).',
      icon: Activity,
      accent: 'pink',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-500/10',
      glow: 'shadow-glow-rose',
      details: [
        'Translates continuous hyperplane distance into an unambiguous binary class.',
        'Class 0: Corresponding to original UCI target value 0 (<50% coronary diameter stenosis).',
        'Class 1: Corresponding to original UCI target values 1, 2, 3, and 4 combined (>=50% diameter stenosis in one or more major epicardial vessels).',
        'Strictly avoids unsupported probabilistic risk claims or artificial disease severity grades.',
      ],
      clinicalContext: 'Provides clear decision support without diagnostic overreach or automated medical labeling.',
    },
    {
      num: 5,
      title: 'SHAP Explanation',
      subtitle: 'Explainable AI Attribution',
      shortDesc: 'Additive feature attribution decomposing the prediction into exact positive and protective clinical factors.',
      icon: FileSearch,
      accent: 'amber',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10',
      glow: 'shadow-glow-amber',
      details: [
        'Computes game-theoretic SHapley Additive exPlanations for each of the 13 clinical features.',
        'Measures the exact additive contribution of each biomarker pushing the score toward Class 1 (positive bars) or Class 0 (protective negative bars).',
        'Extracts the top 5 most influential biomarkers so doctors can inspect the exact reasoning underlying the classification.',
      ],
      clinicalContext: 'Eliminates the black-box dilemma in clinical AI, enabling clinicians to verify model alignment with established pathophysiology.',
    },
  ];

  return (
    <div className='flex-1 flex flex-col bg-navy-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
                <Cpu className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                How It Works
              </h1>
            </div>
            <p className='text-xs sm:text-sm text-slate-400'>
              The five-stage computational pipeline powering CardioTwin AI classification and explainability.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              to='/assessment'
              variant='primary'
              size='sm'
              icon={Sparkles}
              className='shadow-glow-cyan'
            >
              Try the Workflow
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer variant='banner' />

        {/* Clear Non-Realtime / Non-EHR Boundary Notice */}
        <div className='p-4 rounded-2xl bg-navy-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-3'>
          <Info className='w-5 h-5 text-cyan-400 shrink-0 mt-0.5' />
          <div className='space-y-1'>
            <span className='font-bold text-white block'>System Boundary & Scope Notice:</span>
            <p className='leading-relaxed text-slate-300'>
              CardioTwin AI is a standalone research prototype. It does <strong>not</strong> automatically interface with hospital Electronic Health Records (EHR) systems, hospital PACS servers, or live ICU bedside monitors. All clinical values are provided explicitly by the evaluator via the assessment form.
            </p>
          </div>
        </div>

        {/* FIVE-STAGE WORKFLOW (Horizontal on wider screens, Vertical on smaller screens) */}
        <div className='space-y-4'>
          <div className='text-xs font-mono font-bold uppercase tracking-wider text-slate-400'>
            Interactive 5-Stage Architecture
          </div>

          {/* Horizontal layout for desktop / vertical stack for mobile */}
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 relative'>
            {stages.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isSelected = selectedStage === stage.num;
              const isLast = idx === stages.length - 1;

              return (
                <div key={stage.num} className='relative flex flex-col'>
                  <button
                    type='button'
                    onClick={() => setSelectedStage(stage.num)}
                    className={`w-full text-left rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between h-full ${
                      isSelected
                        ? `bg-navy-900 ${stage.borderColor} shadow-card-glow ring-1 ${stage.borderColor}`
                        : 'bg-navy-900/70 border-slate-800 hover:border-slate-700 hover:bg-navy-900'
                    }`}
                  >
                    <div className='space-y-3 w-full'>
                      <div className='flex items-center justify-between'>
                        <span className={`w-7 h-7 rounded-lg ${stage.bgColor} ${stage.borderColor} border flex items-center justify-center text-xs font-mono font-bold ${stage.textColor}`}>
                          {stage.num}
                        </span>
                        <StageIcon className={`w-5 h-5 ${stage.textColor}`} />
                      </div>

                      <div>
                        <h2 className='text-sm font-bold text-white tracking-tight'>
                          {stage.title}
                        </h2>
                        <div className='text-[11px] font-mono text-slate-400 mt-0.5'>
                          {stage.subtitle}
                        </div>
                      </div>

                      <p className='text-xs text-slate-300 leading-relaxed font-sans'>
                        {stage.shortDesc}
                      </p>
                    </div>

                    <div className='mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400 font-semibold flex items-center justify-between'>
                      <span>{isSelected ? 'Currently Viewing' : 'Click to Inspect'}</span>
                      {isSelected ? <CheckCircle2 className='w-3.5 h-3.5 text-cyan-400' /> : <ArrowRight className='w-3 h-3 text-slate-500' />}
                    </div>
                  </button>

                  {/* Connecting Arrow for horizontal screens (hidden on last item and small screens) */}
                  {!isLast && (
                    <div className='hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none'>
                      <div className='w-6 h-6 rounded-full bg-navy-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-md'>
                        <ArrowRight className='w-3 h-3' />
                      </div>
                    </div>
                  )}

                  {/* Connecting Arrow for mobile screens */}
                  {!isLast && (
                    <div className='lg:hidden flex justify-center py-2 text-slate-500'>
                      <ArrowDown className='w-4 h-4' />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* EXPANDED STAGE DEEP-DIVE CARD */}
        {(() => {
          const current = stages.find((s) => s.num === selectedStage) || stages[0];
          const CurrentIcon = current.icon;
          return (
            <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border ${current.borderColor} shadow-2xl relative overflow-hidden backdrop-blur-xl`}>
              <div className='relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6'>
                <div className='flex items-center gap-3'>
                  <div className={`p-3 rounded-2xl ${current.bgColor} ${current.borderColor} border ${current.textColor}`}>
                    <CurrentIcon className='w-6 h-6' />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs font-mono uppercase tracking-wider text-slate-400'>
                        Stage {current.num} In-Depth
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${current.bgColor} ${current.textColor} border ${current.borderColor}`}>
                        Active Lens
                      </span>
                    </div>
                    <h2 className='text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5'>
                      {current.title} — {current.subtitle}
                    </h2>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    disabled={selectedStage === 1}
                    onClick={() => setSelectedStage((prev) => Math.max(1, prev - 1))}
                    className='px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white transition-colors'
                  >
                    Previous Stage
                  </button>
                  <button
                    disabled={selectedStage === 5}
                    onClick={() => setSelectedStage((prev) => Math.min(5, prev + 1))}
                    className='px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs text-cyan-300 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-colors'
                  >
                    Next Stage
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                <div className='lg:col-span-7 space-y-4'>
                  <h3 className='text-sm font-bold text-white font-sans uppercase tracking-wider text-slate-200'>
                    Computational Mechanics
                  </h3>
                  <ul className='space-y-3 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed'>
                    {current.details.map((point, i) => (
                      <li key={i} className='flex items-start gap-2.5'>
                        <span className={`w-1.5 h-1.5 rounded-full ${current.bgColor} ${current.borderColor} border mt-2 shrink-0`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='lg:col-span-5 bg-navy-950/70 rounded-2xl p-5 border border-slate-800 space-y-4'>
                  <div className='flex items-center gap-2 text-xs font-mono text-slate-200 font-bold'>
                    <ShieldCheck className='w-4 h-4 text-emerald-400' />
                    <span>Clinical Relevance for Physicians</span>
                  </div>

                  <p className='text-xs text-slate-300 leading-relaxed font-sans'>
                    {current.clinicalContext}
                  </p>

                  <div className='pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400'>
                    <span>Transparency Factor: </span>
                    <strong className='text-cyan-300 font-semibold'>100% Deterministic & Auditable</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Bottom Call to Action */}
        <div className='pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800'>
          <p className='text-xs text-slate-400'>
            Experience how these 5 stages function in practice with live clinical cases.
          </p>

          <Button
            to='/assessment'
            variant='primary'
            size='md'
            icon={Sparkles}
            className='shadow-glow-cyan'
          >
            Launch Assessment Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
