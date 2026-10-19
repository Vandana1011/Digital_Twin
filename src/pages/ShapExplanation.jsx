import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileSearch, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Info, 
  Sparkles, 
  BarChart2 
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';
import { apiService, CLINICAL_FEATURE_DEFINITIONS } from '../services/api';

export const ShapExplanation = () => {
  const location = useLocation();
  const [assessment] = useState(() => location.state?.assessment || apiService.getLatestAssessment());
  const [activeFeatureKey, setActiveFeatureKey] = useState(null);

  if (!assessment) {
    return (
      <div className='flex-1 flex flex-col bg-[#040614] py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto w-full text-center space-y-6'>
          <div className='w-16 h-16 rounded-3xl bg-purple-950/50 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-glow-purple'>
            <FileSearch className='w-8 h-8' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-extrabold text-white'>
              No Active SHAP Explanation Available
            </h1>
            <p className='text-sm text-[#9496b8] max-w-md mx-auto'>
              SHAP feature attributions require an active patient assessment. Please run an assessment to calculate and visualize model feature contributions.
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
    predictedClass,
    predictedClassLabel,
    decisionMargin,
    allShapFeatures,
    topFiveFeatures,
  } = assessment;

  const maxAbsValue = Math.max(...allShapFeatures.map((f) => Math.abs(f.shapValue)), 0.6);

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-950/60'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <FileSearch className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Why This Prediction? (SHAP Explainability)
              </h1>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/50 text-purple-300 border border-purple-500/30'>
                Case #{id.slice(0, 8)}
              </span>
            </div>
            <p className='text-xs sm:text-sm text-[#9496b8]'>
              Game-theoretic SHapley Additive exPlanations isolating positive risk from protective physiological factors.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              to='/results'
              variant='secondary'
              size='sm'
              icon={ArrowLeft}
              className='rounded-full px-5'
            >
              Back to Prediction
            </Button>
          </div>
        </div>

        <Disclaimer />

        <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold font-sans ${
              predictedClass === 1
                ? 'bg-fuchsia-950/50 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_12px_rgba(217,70,239,0.2)]'
                : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
            }`}>
              {predictedClassLabel}
            </span>
            <span className='text-xs font-mono text-[#9496b8]'>
              Signed Hyperplane Distance: <strong className='text-slate-100 font-bold'>{decisionMargin > 0 ? `+${decisionMargin}` : decisionMargin}</strong>
            </span>
          </div>

          <div className='flex items-center gap-4 text-xs font-mono'>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]' />
              <span className='text-slate-300'>Positive (+ Risk Factor)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]' />
              <span className='text-slate-300'>Negative (- Protective)</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-base font-bold text-white tracking-tight mb-3 flex items-center gap-2'>
            <Sparkles className='w-4 h-4 text-purple-400' />
            <span>Top Five Contributing Biomarkers</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 font-mono'>
            {topFiveFeatures.map((item, idx) => {
              const isPositive = item.direction === 'positive';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-3xl border ${
                    isPositive
                      ? 'bg-fuchsia-950/20 border-fuchsia-500/30 text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,0.12)]'
                      : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.12)]'
                  } space-y-2.5`}
                >
                  <div className='flex items-center justify-between text-xs font-bold text-[#9496b8]'>
                    <span>Rank #{idx + 1}</span>
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      isPositive ? 'text-fuchsia-400' : 'text-cyan-400'
                    }`}>
                      {isPositive ? <TrendingUp className='w-3.5 h-3.5' /> : <TrendingDown className='w-3.5 h-3.5' />}
                      <span>{isPositive ? `+${item.shapValue}` : item.shapValue}</span>
                    </span>
                  </div>

                  <div>
                    <div className='text-xs font-bold text-white font-sans truncate' title={item.featureName}>
                      {item.featureName}
                    </div>
                    <div className='text-[11px] text-slate-300 mt-0.5'>
                      Recorded: <span className='text-white font-bold'>{item.valueDisplay}</span>
                    </div>
                  </div>

                  <p className='text-[11px] text-[#9496b8] font-sans leading-relaxed'>
                    {item.clinicalNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className='rounded-3xl p-6 sm:p-8 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-950/60'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <BarChart2 className='w-4 h-4 text-purple-400' />
                <span>SHAP Feature Contribution Waterfall (All 13 Clinical Biomarkers)</span>
              </h2>
              <p className='text-xs text-[#9496b8] mt-0.5'>
                Quantifies each variable's additive force shifting the prediction away from the baseline decision intercept.
              </p>
            </div>

            <div className='flex items-center gap-3 text-xs font-mono text-[#9496b8]'>
              <span>Center Line: <strong className='text-slate-200'>0.00 (Neutral Decision Axis)</strong></span>
            </div>
          </div>

          <div className='space-y-3 font-mono text-xs'>
            {allShapFeatures.map((feat) => {
              const isPositive = feat.shapValue >= 0;
              const barPercent = Math.min(Math.round((Math.abs(feat.shapValue) / maxAbsValue) * 100), 100);
              const def = CLINICAL_FEATURE_DEFINITIONS[feat.featureKey] || {};

              return (
                <div 
                  key={feat.featureKey}
                  className={`p-3 rounded-2xl transition-all ${
                    activeFeatureKey === feat.featureKey 
                      ? 'bg-purple-950/40 border border-purple-500/40 shadow-glow-purple' 
                      : 'hover:bg-purple-950/20 border border-transparent'
                  }`}
                  onMouseEnter={() => setActiveFeatureKey(feat.featureKey)}
                  onMouseLeave={() => setActiveFeatureKey(null)}
                >
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5'>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-slate-200 font-sans'>{feat.featureName}</span>
                      <span className='text-[11px] text-[#9496b8]'>({feat.valueDisplay})</span>
                    </div>

                    <div className='flex items-center gap-2 text-right'>
                      <span className={`font-bold ${isPositive ? 'text-fuchsia-400' : 'text-cyan-400'}`}>
                        {isPositive ? `+${feat.shapValue}` : feat.shapValue}
                      </span>
                      <span className='text-[10px] text-[#9496b8] uppercase font-sans'>
                        {isPositive ? 'toward Presence' : 'toward Absence'}
                      </span>
                    </div>
                  </div>

                  <div className='relative w-full h-4 bg-navy-950 rounded-full border border-purple-500/20 overflow-hidden flex'>
                    <div className='relative w-1/2 h-full flex justify-end items-center pr-0.5 border-r border-purple-500/40'>
                      {!isPositive && (
                        <div
                          className='h-2.5 rounded-l-full bg-gradient-to-l from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                          style={{ width: `${barPercent}%` }}
                        />
                      )}
                    </div>

                    <div className='relative w-1/2 h-full flex justify-start items-center pl-0.5'>
                      {isPositive && (
                        <div
                          className='h-2.5 rounded-r-full bg-gradient-to-r from-fuchsia-500 to-rose-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]'
                          style={{ width: `${barPercent}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {activeFeatureKey === feat.featureKey && (
                    <div className='mt-2.5 p-3 rounded-xl bg-navy-950 border border-purple-500/30 text-[11px] text-slate-300 font-sans shadow-lg'>
                      <strong className='text-purple-300'>Clinical Context:</strong> {def.tooltip} • {feat.clinicalNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className='pt-2 flex justify-between text-[10px] font-mono text-[#9496b8] border-t border-purple-950/60'>
            <span>- {maxAbsValue.toFixed(2)} (Protective / Absence)</span>
            <span className='text-purple-300 font-bold'>0.00 Baseline Intercept</span>
            <span>+ {maxAbsValue.toFixed(2)} (Risk Factor / Presence)</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2 text-white font-bold text-sm'>
              <Info className='w-4 h-4 text-purple-400' />
              <span>How to Interpret SHAP Values</span>
            </div>
            <ul className='space-y-2 text-xs text-slate-300 leading-relaxed font-sans'>
              <li className='flex items-start gap-2'>
                <span className='text-fuchsia-400 font-bold font-mono mt-0.5'>+</span>
                <span><strong>Positive Bars (Fuchsia / Magenta):</strong> Clinical features that push the model toward classifying the patient as Class 1 (Presence of CAD).</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-cyan-400 font-bold font-mono mt-0.5'>-</span>
                <span><strong>Negative Bars (Cyan / Blue):</strong> Clinical features that act as protective factors, pushing the model toward Class 0 (Absence of CAD).</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-purple-400 font-bold font-mono mt-0.5'>∑</span>
                <span><strong>Additive Decision Function:</strong> The sum of all 13 feature SHAP contributions plus the model intercept equals the final hyperplane decision distance.</span>
              </li>
            </ul>
          </div>

          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2 text-purple-300 font-bold text-sm'>
              <ShieldAlert className='w-4 h-4 text-purple-400' />
              <span>Causation vs. Mathematical Attribution</span>
            </div>
            <p className='text-xs text-[#9496b8] leading-relaxed font-sans'>
              <strong className='text-slate-200'>Important Clinical Distinction:</strong> SHAP values describe how features influence the mathematical model output; they do <em>not</em> establish clinical causation. A high positive SHAP value for asymptomatic chest pain or high heart rate indicates strong statistical association within the trained dataset, not biological etiology. Clinical decisions must always be guided by qualified medical professionals and comprehensive diagnostic protocols.
            </p>
          </div>
        </div>

        <div className='pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-950/60'>
          <Button
            to='/results'
            variant='secondary'
            size='md'
            icon={ArrowLeft}
            className='rounded-full px-6'
          >
            Return to Assessment Results
          </Button>

          <div className='flex items-center gap-3'>
            <Button
              to='/dashboard'
              variant='secondary'
              size='md'
              className='rounded-full px-5'
            >
              Dashboard
            </Button>
            <Button
              to='/predict'
              variant='primary'
              size='md'
              icon={Sparkles}
              className='shadow-glow-purple rounded-full px-6'
            >
              New Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapExplanation;
