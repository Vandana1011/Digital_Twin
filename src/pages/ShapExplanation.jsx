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
import { apiService } from '../services/api';

export const ShapExplanation = () => {
  const location = useLocation();
  const [assessment] = useState(() => location.state?.assessment || apiService.getLatestAssessment());
  const [activeFeatureKey, setActiveFeatureKey] = useState(null);

  if (!assessment) {
    return (
      <div className='flex-1 flex flex-col bg-navy-950 py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto w-full text-center space-y-6'>
          <div className='w-16 h-16 rounded-3xl bg-electric-purple/15 border border-electric-purple/30 text-electric-purple flex items-center justify-center mx-auto shadow-glow-purple'>
            <FileSearch className='w-8 h-8' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-extrabold text-white'>
              No Active SHAP Explanation Available
            </h1>
            <p className='text-sm text-slate-400 max-w-md mx-auto'>
              SHAP feature attributions require an active patient assessment. Please run an assessment to calculate and visualize model feature contributions.
            </p>
          </div>
          <div>
            <Button
              to='/assessment'
              variant='primary'
              size='lg'
              icon={Sparkles}
              className='shadow-glow-cyan'
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

  // Find max absolute SHAP value for scaling the horizontal bar widths accurately
  const maxAbsValue = Math.max(...allShapFeatures.map((f) => Math.abs(f.shapValue)), 0.6);

  return (
    <div className='flex-1 flex flex-col bg-navy-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        {/* Header & Back Button */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-electric-purple/15 border border-electric-purple/30 text-electric-purple'>
                <FileSearch className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Why This Prediction?
              </h1>
            </div>
            <p className='text-xs sm:text-sm text-slate-400'>
              SHAP (SHapley Additive exPlanations) attribution for Assessment #{id}
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              to='/results'
              variant='secondary'
              size='sm'
              icon={ArrowLeft}
            >
              Back to Prediction Results
            </Button>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <Disclaimer variant='banner' />

        {/* Model Prediction Context Pill */}
        <div className='rounded-2xl p-4 bg-navy-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold font-sans ${
              predictedClass === 1
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
            }`}>
              {predictedClassLabel}
            </span>
            <span className='text-xs font-mono text-slate-400'>
              Decision score (not a probability): <strong className='text-slate-200'>{decisionMargin > 0 ? `+${decisionMargin.toFixed(3)}` : decisionMargin.toFixed(3)}</strong>
            </span>
          </div>

          {/* Visual Legend */}
          <div className='flex items-center gap-4 text-xs font-mono'>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded bg-rose-500' />
              <span className='text-slate-300'>Positive contribution (toward original UCI target 1)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded bg-cyan-500' />
              <span className='text-slate-300'>Negative contribution (toward original UCI target 0)</span>
            </div>
          </div>
        </div>

        {/* TOP FIVE CONTRIBUTING FEATURES CARDS */}
        <div>
          <h2 className='text-base font-bold text-white tracking-tight mb-3 flex items-center gap-2'>
            <Sparkles className='w-4 h-4 text-cyan-400' />
            <span>Top Five Contributing Features</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 font-mono'>
            {topFiveFeatures.map((item, idx) => {
              const isPositive = item.direction === 'positive';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isPositive
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-200 shadow-glow-rose/10'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200 shadow-glow-cyan/10'
                  } space-y-2`}
                >
                  <div className='flex items-center justify-between text-xs font-bold text-slate-400'>
                    <span>Rank #{idx + 1}</span>
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      isPositive ? 'text-rose-400' : 'text-cyan-400'
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

                  <p className='text-[11px] text-slate-300 font-sans leading-relaxed'>
                    {item.clinicalNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: HORIZONTAL BAR CHART OF SHAP FEATURE CONTRIBUTIONS */}
        <div className='rounded-3xl p-6 sm:p-8 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <BarChart2 className='w-4 h-4 text-electric-purple' />
                <span>SHAP Feature Contribution Waterfall (All 13 Clinical Biomarkers)</span>
              </h2>
              <p className='text-xs text-slate-400 mt-0.5'>
                SHAP contributions explain the model decision score for this input; they do not indicate medical cause.
              </p>
            </div>

            <div className='flex items-center gap-3 text-xs font-mono text-slate-400'>
              <span>Center Line: <strong className='text-slate-200'>0.00 (Neutral)</strong></span>
            </div>
          </div>

          {/* Clean Horizontal Bar Representation */}
          <div className='space-y-3 font-mono text-xs'>
            {allShapFeatures.map((feat) => {
              const isPositive = feat.shapValue >= 0;
              const barPercent = Math.min(Math.round((Math.abs(feat.shapValue) / maxAbsValue) * 100), 100);

              return (
                <div 
                  key={feat.featureKey}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeFeatureKey === feat.featureKey 
                      ? 'bg-navy-800 border border-slate-700' 
                      : 'hover:bg-navy-950/60'
                  }`}
                  onMouseEnter={() => setActiveFeatureKey(feat.featureKey)}
                  onMouseLeave={() => setActiveFeatureKey(null)}
                >
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5'>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-slate-200 font-sans'>{feat.featureName}</span>
                      <span className='text-[11px] text-slate-400'>({feat.valueDisplay})</span>
                    </div>

                    <div className='flex items-center gap-2 text-right'>
                      <span className={`font-bold ${isPositive ? 'text-rose-400' : 'text-cyan-400'}`}>
                        {isPositive ? `+${feat.shapValue}` : feat.shapValue}
                      </span>
                      <span className='text-[10px] text-slate-400 uppercase font-sans'>
                        {isPositive ? 'toward Presence' : 'toward Absence'}
                      </span>
                    </div>
                  </div>

                  {/* Dual-sided horizontal bar container with center zero-axis */}
                  <div className='relative w-full h-4 bg-navy-950 rounded-full border border-slate-800/80 overflow-hidden flex'>
                    {/* Negative Side (Left half: 0 down to -max) */}
                    <div className='relative w-1/2 h-full flex justify-end items-center pr-0.5 border-r border-slate-700'>
                      {!isPositive && (
                        <div
                          className='h-2.5 rounded-l-full bg-gradient-to-l from-cyan-400 to-cyan-600 shadow-glow-cyan'
                          style={{ width: `${barPercent}%` }}
                        />
                      )}
                    </div>

                    {/* Positive Side (Right half: 0 up to +max) */}
                    <div className='relative w-1/2 h-full flex justify-start items-center pl-0.5'>
                      {isPositive && (
                        <div
                          className='h-2.5 rounded-r-full bg-gradient-to-r from-rose-500 to-electric-pink shadow-glow-rose'
                          style={{ width: `${barPercent}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Feature description note on hover or expand */}
                  {activeFeatureKey === feat.featureKey && (
                    <div className='mt-2 p-2 rounded-lg bg-navy-950 border border-slate-800 text-[11px] text-slate-300 font-sans'>
                      <strong>Model explanation:</strong> {feat.clinicalNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Axis Scale Indicator */}
          <div className='pt-2 flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80'>
            <span>- {maxAbsValue.toFixed(2)} (toward original UCI target 0)</span>
            <span className='text-slate-300 font-bold'>0.00 Baseline</span>
            <span>+ {maxAbsValue.toFixed(2)} (toward original UCI target 1)</span>
          </div>
        </div>

        {/* SECTION: CONCISE EXPLANATION OF HOW TO READ THE CHART */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2 text-white font-bold text-sm'>
              <Info className='w-4 h-4 text-cyan-400' />
              <span>How to Interpret SHAP Values</span>
            </div>
            <ul className='space-y-2 text-xs text-slate-300 leading-relaxed font-sans'>
              <li className='flex items-start gap-2'>
                <span className='text-rose-400 font-bold font-mono mt-0.5'>+</span>
                <span><strong>Positive Bars (Rose / Red):</strong> Clinical features that push the model toward classifying the patient as Class 1 (Presence of CAD).</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-cyan-400 font-bold font-mono mt-0.5'>-</span>
                <span><strong>Negative Bars (Cyan / Blue):</strong> Clinical features that act as protective factors, pushing the model toward Class 0 (Absence of CAD).</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-electric-purple font-bold font-mono mt-0.5'>∑</span>
                <span><strong>Interpretation:</strong> Contributions explain the model decision score. The score is not a probability, diagnosis, or future event prediction.</span>
              </li>
            </ul>
          </div>

          {/* CRITICAL NOTE: SHAP DOES NOT ESTABLISH CLINICAL CAUSATION */}
          <div className='rounded-2xl p-6 bg-navy-900/80 border border-amber-500/30 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2 text-amber-300 font-bold text-sm'>
              <ShieldAlert className='w-4 h-4 text-amber-400' />
              <span>Causation vs. Mathematical Attribution</span>
            </div>
            <p className='text-xs text-slate-300 leading-relaxed font-sans'>
              <strong>Important Clinical Distiction:</strong> SHAP values describe how features influence the mathematical model output; they do <em>not</em> establish clinical causation. A high positive SHAP value for asymptomatic chest pain or high heart rate indicates strong statistical association within the trained dataset, not biological etiology. Clinical decisions must always be guided by qualified medical professionals and comprehensive diagnostic protocols.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className='pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800'>
          <Button
            to='/results'
            variant='secondary'
            size='md'
            icon={ArrowLeft}
          >
            Return to Assessment Results
          </Button>

          <div className='flex items-center gap-3'>
            <Button
              to='/dashboard'
              variant='secondary'
              size='md'
            >
              Dashboard
            </Button>
            <Button
              to='/assessment'
              variant='primary'
              size='md'
              icon={Sparkles}
              className='shadow-glow-cyan'
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
