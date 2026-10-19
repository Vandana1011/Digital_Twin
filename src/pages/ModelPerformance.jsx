import { Activity, BarChart3, Database, Info, Layers } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';
import { MODEL_EVALUATION_METRICS } from '../services/api';

const MetricCard = ({ title, value, spread, accent, note }) => (
  <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow'>
    <div className='text-xs text-[#9496b8] mb-2 font-mono'>{title}</div>
    <div className={`text-3xl font-extrabold font-mono tracking-tight ${accent}`}>{value}</div>
    <div className='text-xs text-slate-300 mt-1'>{spread}</div>
    <p className='text-[11px] text-[#9496b8] mt-3'>{note}</p>
  </div>
);

export const ModelPerformance = () => {
  const metrics = MODEL_EVALUATION_METRICS;

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='pb-6 border-b border-purple-950/60 space-y-2'>
          <div className='flex items-center gap-2.5'>
            <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400'>
              <BarChart3 className='w-5 h-5' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>Model Performance &amp; Evaluation</h1>
          </div>
          <p className='text-xs sm:text-sm text-[#9496b8]'>Saved SVC pipeline evaluation on the UCI Cleveland dataset using stratified 5-fold cross-validation.</p>
          <div className='inline-flex items-center gap-2 font-mono text-xs text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl'>
            <Database className='w-3.5 h-3.5 text-electric-blue' />
            <span>303 records · 13 input features · 5 folds</span>
          </div>
        </div>

        <Disclaimer variant='banner' />

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <MetricCard title='Mean Accuracy' value={`${metrics.accuracy}%`} spread={`± ${metrics.accuracyStd}% across folds`} accent='text-purple-300' note='Average fraction correctly classified in the five internal validation folds.' />
          <MetricCard title='Mean F1-Score' value={metrics.macroF1} spread={`± ${metrics.macroF1Std}`} accent='text-emerald-400' note='Average F1-score across folds; see the experiment metadata for scoring details.' />
          <MetricCard title='Mean ROC-AUC' value={metrics.rocAuc} spread={`± ${metrics.rocAucStd}`} accent='text-electric-blue' note='Average ROC-AUC across folds, measuring class ranking performance.' />
        </div>

        <section className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex items-center gap-2 pb-3 border-b border-purple-950/60'>
            <Layers className='w-4 h-4 text-purple-400' />
            <h2 className='text-base font-bold text-white'>Cross-validation fold scores</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs'>
            {metrics.crossValidationFolds.map((fold) => (
              <div key={fold.fold} className='p-4 rounded-2xl bg-navy-950/70 border border-purple-500/15 space-y-2'>
                <div className='font-bold text-slate-200'>{fold.fold}</div>
                <div className='space-y-1 text-[#9496b8]'>
                  <div className='flex justify-between'><span>Accuracy</span><strong className='text-purple-300'>{fold.accuracy}%</strong></div>
                  <div className='flex justify-between'><span>F1-score</span><strong className='text-slate-200'>{fold.f1}</strong></div>
                  <div className='flex justify-between'><span>ROC-AUC</span><strong className='text-electric-blue'>{fold.rocAuc}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
          <h2 className='text-sm font-bold text-white flex items-center gap-2'><Info className='w-4 h-4 text-purple-400' />How to read these numbers</h2>
          <p className='text-xs text-slate-300 leading-relaxed'>The figures above are means and standard deviations from internal cross-validation, not an independent external validation or a held-out clinical study. A confusion matrix and ROC curve are not shown because matching per-patient hold-out predictions were not available in the supplied evaluation artifacts.</p>
          <p className='text-xs text-[#9496b8] leading-relaxed'>This is a small historical research dataset. The model output and SHAP values are for demonstration and research only, not diagnosis, medical advice, or a prediction of a future heart attack.</p>
        </section>

        <div className='flex items-start gap-3 rounded-2xl p-5 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200'>
          <Activity className='w-4 h-4 text-amber-300 shrink-0 mt-0.5' />
          <p>Cross-validation is internal validation. It does not establish clinical safety, performance on other populations, or suitability for patient care.</p>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;
