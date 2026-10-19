import { 
  ResponsiveContainer, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Area, 
  AreaChart 
} from 'recharts';
import { 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  Database, 
  Layers, 
  Info,
  Scale
} from 'lucide-react';
import Disclaimer from '../components/Disclaimer';
import { MODEL_EVALUATION_METRICS } from '../services/api';

const CustomRocTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className='rounded-2xl bg-[#070b24]/95 border border-purple-500/40 p-3.5 shadow-2xl backdrop-blur-md text-xs font-mono'>
        <p className='font-bold text-purple-300 mb-1'>Decision Cutoff Threshold</p>
        <div className='space-y-0.5 text-slate-200'>
          <div>True Positive Rate (Sensitivity): <strong className='text-purple-400 font-bold'>{(data.tpr * 100).toFixed(1)}%</strong></div>
          <div>False Positive Rate (1 - Specificity): <strong className='text-[#9496b8] font-bold'>{(data.fpr * 100).toFixed(1)}%</strong></div>
        </div>
      </div>
    );
  }
  return null;
};

export const ModelPerformance = () => {
  const {
    accuracy,
    macroF1,
    rocAuc,
    sampleSize,
    confusionMatrix,
    rocCurveData,
    crossValidationFolds,
  } = MODEL_EVALUATION_METRICS;

  const { trueNegative, falsePositive, falseNegative, truePositive, total } = confusionMatrix;

  const sensitivity = ((truePositive / (truePositive + falseNegative)) * 100).toFixed(1);
  const specificity = ((trueNegative / (trueNegative + falsePositive)) * 100).toFixed(1);
  const ppv = ((truePositive / (truePositive + falsePositive)) * 100).toFixed(1);
  const npv = ((trueNegative / (trueNegative + falseNegative)) * 100).toFixed(1);

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-950/60'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <BarChart3 className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Model Performance & Evaluation
              </h1>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/50 text-purple-300 border border-purple-500/30'>
                Hold-Out Test Split
              </span>
            </div>
            <p className='text-xs sm:text-sm text-[#9496b8]'>
              Empirical evaluation on 61 hold-out test samples from the UCI Cleveland repository.
            </p>
          </div>

          <div className='flex items-center gap-2 font-mono text-xs text-[#9496b8] bg-[#070b24] border border-purple-500/20 px-3.5 py-2 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.12)]'>
            <Database className='w-3.5 h-3.5 text-purple-400' />
            <span>N = {total} Test Split</span>
          </div>
        </div>

        <Disclaimer />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow hover:border-purple-500/40 transition-all'>
            <div className='flex items-center justify-between text-xs text-[#9496b8] mb-2 font-mono'>
              <span>Accuracy</span>
              <span className='p-1 rounded bg-purple-950/60 text-purple-300'>Test Set</span>
            </div>
            <div className='text-3xl font-extrabold text-white font-mono tracking-tight text-purple-300'>
              {accuracy}%
            </div>
            <p className='text-[11px] text-[#9496b8] mt-2 font-sans'>
              Proportion of all true positive and true negative test predictions (54 / 61).
            </p>
          </div>

          <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow hover:border-purple-500/40 transition-all'>
            <div className='flex items-center justify-between text-xs text-[#9496b8] mb-2 font-mono'>
              <span>Macro F1-Score</span>
              <span className='p-1 rounded bg-emerald-950/60 text-emerald-300'>Harmonic</span>
            </div>
            <div className='text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400'>
              {macroF1}
            </div>
            <p className='text-[11px] text-[#9496b8] mt-2 font-sans'>
              Unweighted mean of F1-scores across both presence and absence classes.
            </p>
          </div>

          <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow hover:border-purple-500/40 transition-all'>
            <div className='flex items-center justify-between text-xs text-[#9496b8] mb-2 font-mono'>
              <span>ROC-AUC</span>
              <span className='p-1 rounded bg-purple-950/60 text-electric-blue'>Discrimination</span>
            </div>
            <div className='text-3xl font-extrabold text-white font-mono tracking-tight text-purple-400'>
              {rocAuc}
            </div>
            <p className='text-[11px] text-[#9496b8] mt-2 font-sans'>
              Area under Receiver Operating Characteristic curve across all decision thresholds.
            </p>
          </div>

          <div className='rounded-3xl p-5 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow hover:border-purple-500/40 transition-all'>
            <div className='flex items-center justify-between text-xs text-[#9496b8] mb-2 font-mono'>
              <span>Evaluation Samples</span>
              <span className='p-1 rounded bg-slate-900 text-slate-300'>Hold-out</span>
            </div>
            <div className='text-3xl font-extrabold text-white font-mono tracking-tight text-electric-blue'>
              {sampleSize}
            </div>
            <p className='text-[11px] text-[#9496b8] mt-2 font-sans'>
              Patients in the held-out evaluation test set (stratified 20% split).
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-6 rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-5'>
            <div className='flex items-center justify-between pb-3 border-b border-purple-950/60'>
              <div>
                <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                  <Scale className='w-4 h-4 text-purple-400' />
                  <span>2x2 Confusion Matrix (N = {total})</span>
                </h2>
                <p className='text-xs text-[#9496b8] mt-0.5'>
                  Contingency breakdown of actual vs. model-predicted binary classes.
                </p>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-2 font-mono text-center text-xs'>
                <div />
                <div className='p-2 text-[#9496b8] font-bold'>Predicted: Class 0 (Absence)</div>
                <div className='p-2 text-[#9496b8] font-bold'>Predicted: Class 1 (Presence)</div>

                <div className='p-2 text-[#9496b8] font-bold flex items-center justify-center text-right'>
                  Actual: Class 0
                </div>
                <div className='p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200'>
                  <div className='text-2xl font-black font-mono'>{trueNegative}</div>
                  <div className='text-[10px] uppercase font-bold text-emerald-400 mt-1'>True Negative (TN)</div>
                  <div className='text-[10px] text-[#9496b8]'>49.2% of cohort</div>
                </div>
                <div className='p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-200'>
                  <div className='text-2xl font-black font-mono'>{falsePositive}</div>
                  <div className='text-[10px] uppercase font-bold text-rose-400 mt-1'>False Positive (FP)</div>
                  <div className='text-[10px] text-[#9496b8]'>6.6% of cohort</div>
                </div>

                <div className='p-2 text-[#9496b8] font-bold flex items-center justify-center text-right'>
                  Actual: Class 1
                </div>
                <div className='p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200'>
                  <div className='text-2xl font-black font-mono'>{falseNegative}</div>
                  <div className='text-[10px] uppercase font-bold text-amber-400 mt-1'>False Negative (FN)</div>
                  <div className='text-[10px] text-[#9496b8]'>4.9% of cohort</div>
                </div>
                <div className='p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-purple-200'>
                  <div className='text-2xl font-black font-mono'>{truePositive}</div>
                  <div className='text-[10px] uppercase font-bold text-purple-400 mt-1'>True Positive (TP)</div>
                  <div className='text-[10px] text-[#9496b8]'>39.3% of cohort</div>
                </div>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-purple-950/60 text-center font-mono text-xs'>
                <div className='p-3 rounded-xl bg-navy-950/70 border border-purple-500/15'>
                  <span className='text-[10px] text-[#9496b8] block uppercase'>Sensitivity (Recall)</span>
                  <span className='text-sm font-bold text-purple-300'>{sensitivity}%</span>
                </div>
                <div className='p-3 rounded-xl bg-navy-950/70 border border-purple-500/15'>
                  <span className='text-[10px] text-[#9496b8] block uppercase'>Specificity</span>
                  <span className='text-sm font-bold text-emerald-400'>{specificity}%</span>
                </div>
                <div className='p-3 rounded-xl bg-navy-950/70 border border-purple-500/15'>
                  <span className='text-[10px] text-[#9496b8] block uppercase'>PPV (Precision)</span>
                  <span className='text-sm font-bold text-fuchsia-400'>{ppv}%</span>
                </div>
                <div className='p-3 rounded-xl bg-navy-950/70 border border-purple-500/15'>
                  <span className='text-[10px] text-[#9496b8] block uppercase'>NPV</span>
                  <span className='text-sm font-bold text-electric-blue'>{npv}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-6 rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
            <div className='flex items-center justify-between pb-3 border-b border-purple-950/60'>
              <div>
                <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                  <Activity className='w-4 h-4 text-purple-400' />
                  <span>Receiver Operating Characteristic (ROC)</span>
                </h2>
                <p className='text-xs text-[#9496b8] mt-0.5'>
                  True Positive Rate vs. False Positive Rate (AUC = {rocAuc}).
                </p>
              </div>
              <span className='px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-950/60 text-purple-300 border border-purple-500/40 shadow-glow-purple'>
                AUC: {rocAuc}
              </span>
            </div>

            <div className='h-64 w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={rocCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id='rocAreaGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                      <stop offset='5%' stopColor='#a855f7' stopOpacity={0.45} />
                      <stop offset='95%' stopColor='#a855f7' stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='rgba(168,85,247,0.1)' />
                  <XAxis 
                    dataKey='fpr' 
                    stroke='#64748b' 
                    tick={{ fill: '#9496b8', fontSize: 11 }} 
                    domain={[0, 1]} 
                    tickFormatter={(v) => v.toFixed(1)}
                    label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -5, fill: '#9496b8', fontSize: 10 }}
                  />
                  <YAxis 
                    dataKey='tpr' 
                    stroke='#64748b' 
                    tick={{ fill: '#9496b8', fontSize: 11 }} 
                    domain={[0, 1]} 
                    tickFormatter={(v) => v.toFixed(1)}
                    label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', offset: 25, fill: '#9496b8', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomRocTooltip />} />
                  <Line 
                    type='monotone' 
                    dataKey='baseline' 
                    stroke='#475569' 
                    strokeDasharray='4 4' 
                    strokeWidth={1.5} 
                    dot={false}
                    name='Random Chance (AUC = 0.50)'
                  />
                  <Area 
                    type='monotone' 
                    dataKey='tpr' 
                    stroke='#a855f7' 
                    strokeWidth={2.5} 
                    fill='url(#rocAreaGrad)' 
                    name='SVC Classifier' 
                    dot={{ fill: '#c084fc', r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className='text-[11px] font-mono text-[#9496b8] flex items-center justify-between pt-2 border-t border-purple-950/60'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]' />
                <span>SVC Model (AUC: 0.961)</span>
              </span>
              <span className='flex items-center gap-1.5 text-slate-500'>
                <span className='w-2.5 h-0.5 bg-slate-500' />
                <span>Chance Baseline (AUC: 0.500)</span>
              </span>
            </div>
          </div>
        </div>

        <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex items-center justify-between pb-3 border-b border-purple-950/60'>
            <div>
              <h2 className='text-base font-bold text-white tracking-tight flex items-center gap-2'>
                <Layers className='w-4 h-4 text-purple-400' />
                <span>5-Fold Stratified Cross-Validation Results</span>
              </h2>
              <p className='text-xs text-[#9496b8] mt-0.5'>
                Assesses generalization consistency across 5 stratified folds of the training distribution.
              </p>
            </div>
            <div className='text-xs font-mono text-purple-300 bg-purple-950/50 px-3 py-1 rounded-full border border-purple-500/30'>
              Mean Accuracy: 87.7% ± 1.6%
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs'>
            {crossValidationFolds.map((fold, idx) => (
              <div key={idx} className='p-4 rounded-2xl bg-navy-950/70 border border-purple-500/15 space-y-2'>
                <div className='text-xs font-bold text-slate-200'>{fold.fold}</div>
                <div className='space-y-1 text-[#9496b8]'>
                  <div className='flex justify-between'>
                    <span>Accuracy:</span>
                    <strong className='text-purple-300'>{fold.accuracy}%</strong>
                  </div>
                  <div className='flex justify-between'>
                    <span>F1-Score:</span>
                    <strong className='text-slate-200'>{fold.f1}</strong>
                  </div>
                  <div className='flex justify-between'>
                    <span>ROC-AUC:</span>
                    <strong className='text-electric-blue'>{fold.rocAuc}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
            <h3 className='text-sm font-bold text-white tracking-tight flex items-center gap-2'>
              <Info className='w-4 h-4 text-purple-400' />
              <span>Clinical Evaluation Metric Definitions</span>
            </h3>
            <div className='space-y-2 text-xs text-slate-300 leading-relaxed font-sans'>
              <p>
                <strong>Classification Accuracy (88.5%):</strong> Overall rate of correct classifications on the hold-out test set (54/61 patients).
              </p>
              <p>
                <strong>Macro F1-Score (0.89):</strong> Unweighted harmonic average of precision and recall computed separately for Class 0 (absence) and Class 1 (presence). Prevents skewed reporting on imbalanced classes.
              </p>
              <p>
                <strong>ROC-AUC (0.961):</strong> Area under the ROC curve measures how reliably the model ranks a randomly chosen positive case higher than a randomly chosen negative case across all operating thresholds.
              </p>
              <p>
                <strong>Sensitivity (88.9%):</strong> Probability of correctly classifying patients with confirmed CAD (low false negative rate).
              </p>
            </div>
          </div>

          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
            <h3 className='text-sm font-bold text-white tracking-tight flex items-center gap-2'>
              <Database className='w-4 h-4 text-emerald-400' />
              <span>Dataset & Cohort Specifications</span>
            </h3>
            <div className='space-y-2 text-xs text-slate-300 leading-relaxed font-sans'>
              <p>
                <strong>Source:</strong> UCI Machine Learning Repository — Heart Disease Database (Cleveland Clinic Foundation).
              </p>
              <p>
                <strong>Total Cohort:</strong> 303 complete patient instances evaluated via coronary fluoroscopy.
              </p>
              <p>
                <strong>Training Split:</strong> 242 instances (80%) used for hyperparameter tuning and SVC RBF kernel margin fitting.
              </p>
              <p>
                <strong>Hold-Out Test Split:</strong> 61 instances (20%) held untouched until final evaluation to prevent data leakage.
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-3xl p-6 sm:p-8 bg-[#070b24]/90 border border-amber-500/30 shadow-card-glow space-y-4'>
          <div className='flex items-center gap-2.5 text-amber-300'>
            <AlertTriangle className='w-5 h-5 text-amber-400 shrink-0' />
            <h2 className='text-base font-bold text-white tracking-tight'>
              Model Limitations & Research Boundary Notice
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed'>
            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-amber-300 block'>Small Cohort Size (N = 303)</span>
              <p>
                The model is trained on a small historic cohort of 303 patients from 1988. While statistically robust for benchmark research, modern deep learning or multi-center cohorts are necessary before clinical translation.
              </p>
            </div>

            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-amber-300 block'>Geographic & Demographic Imbalance</span>
              <p>
                The dataset was gathered from a single inpatient tertiary center (Cleveland Clinic) and is predominantly male (68%). It may not generalize equally across diverse racial, ethnic, or gender demographics.
              </p>
            </div>

            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-amber-300 block'>Binary Categorization Simplification</span>
              <p>
                Coronary disease exists on a continuous pathophysiological spectrum. Grouping grades 1, 2, 3, and 4 into a single binary Class 1 loses granularity regarding multi-vessel vs single-vessel obstruction.
              </p>
            </div>

            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-amber-300 block'>Absence of Real-Time Longitudinal Tracking</span>
              <p>
                Data points reflect cross-sectional admissions. The system does not connect to live electronic health record (EHR) feeds or continuous ICU telemetry monitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;
