import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ShieldAlert, Cpu, Sparkles, Layers, Activity } from 'lucide-react';
import AnatomicalHeart from '../components/AnatomicalHeart';
import Button from '../components/Button';

export const Home = () => {
  return (
    <div className='flex-1 flex flex-col overflow-hidden bg-navy-950'>
      {/* Hero Section */}
      <section className='relative pt-8 pb-16 sm:pb-24 lg:pt-14 overflow-hidden border-b border-slate-800/80 bg-radial-gradient-navy'>
        {/* Ambient atmospheric glows */}
        <div 
          className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-electric-purple/15 to-electric-pink/10 rounded-full blur-3xl pointer-events-none' 
          aria-hidden='true' 
        />
        <div 
          className='absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none' 
          aria-hidden='true' 
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Clinical Disclaimer Banner */}
          <div className='mb-8 max-w-2xl mx-auto lg:mx-0'>
            <div className='inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-slate-700/80 text-slate-300 text-xs shadow-lg backdrop-blur-md'>
              <ShieldAlert className='w-4 h-4 text-amber-400 shrink-0' />
              <span className='font-medium text-slate-200'>Research prototype only — not a clinical diagnosis tool.</span>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
            {/* Left Column: Hero Text & Call-to-actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='lg:col-span-6 text-center lg:text-left space-y-6'
            >
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide'>
                <Sparkles className='w-3.5 h-3.5 text-cyan-400' />
                <span>CardioTwin AI • Explainable Cardiovascular AI</span>
              </div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]'>
                Smarter Insights. <br className='hidden sm:inline' />
                <span className='bg-gradient-to-r from-cyan-400 via-teal-300 to-electric-purple bg-clip-text text-transparent'>
                  Healthier Hearts.
                </span>
              </h1>

              <p className='text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0'>
                AI-assisted heart disease classification with explainable clinical insights.
              </p>

              <p className='text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0'>
                CardioTwin AI bridges advanced machine learning and clinical interpretability. By pairing a calibrated Support Vector Classifier with granular SHAP feature attributions, clinicians and researchers can inspect the physiological markers driving each model assessment.
              </p>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2'>
                <Button
                  to='/dashboard'
                  variant='primary'
                  size='lg'
                  icon={ArrowRight}
                  iconPosition='right'
                  className='w-full sm:w-auto shadow-glow-cyan'
                >
                  Explore Dashboard
                </Button>

                <Button
                  to='/how-it-works'
                  variant='secondary'
                  size='lg'
                  icon={BookOpen}
                  className='w-full sm:w-auto'
                >
                  How It Works
                </Button>
              </div>

              {/* Evaluation Metrics highlights */}
              <div className='pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left'>
                <div>
                  <div className='text-2xl font-black font-mono text-cyan-300'>85.46%</div>
                  <div className='text-xs text-slate-400 font-sans'>Model Accuracy</div>
                </div>
                <div>
                  <div className='text-2xl font-black font-mono text-electric-purple'>0.9046</div>
                  <div className='text-xs text-slate-400 font-sans'>ROC-AUC Score</div>
                </div>
                <div>
                  <div className='text-2xl font-black font-mono text-emerald-400'>0.89</div>
                  <div className='text-xs text-slate-400 font-sans'>Macro F1-Score</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Anatomical Heart Visual with Continuous ECG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className='lg:col-span-6 flex justify-center'
            >
              <AnatomicalHeart />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview & Three Pillars Section */}
      <section className='py-16 sm:py-20 bg-navy-950 relative border-b border-slate-800/80'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto mb-14 space-y-3'>
            <span className='text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20'>
              Core Architecture
            </span>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
              Engineered for Clinical Transparency
            </h2>
            <p className='text-slate-400 text-sm sm:text-base leading-relaxed'>
              Designed from the ground up to assist healthcare professionals by transforming opaque machine learning predictions into auditable, biomarker-level explanations.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow hover:border-cyan-500/30 transition-all'>
              <div className='w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4'>
                <Layers className='w-5 h-5' />
              </div>
              <h3 className='text-base font-bold text-white mb-2'>
                13 Clinical Biomarkers
              </h3>
              <p className='text-xs sm:text-sm text-slate-400 leading-relaxed mb-4'>
                Utilizes standardized cardiovascular indicators from the landmark Cleveland dataset, including resting hemodynamic parameters, exercise ST-depression, and fluoroscopic vessel counts.
              </p>
              <div className='text-[11px] font-mono text-cyan-300 bg-navy-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 inline-block'>
                Standardized Clinical Form
              </div>
            </div>

            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow hover:border-electric-purple/40 transition-all'>
              <div className='w-11 h-11 rounded-xl bg-electric-purple/15 border border-electric-purple/30 text-electric-purple flex items-center justify-center mb-4'>
                <Cpu className='w-5 h-5' />
              </div>
              <h3 className='text-base font-bold text-white mb-2'>
                Support Vector Classifier (SVC)
              </h3>
              <p className='text-xs sm:text-sm text-slate-400 leading-relaxed mb-4'>
                Uses a saved Support Vector Classifier. Reported stratified 5-fold cross-validation means are 85.46% accuracy and 0.9046 ROC-AUC on the UCI dataset; this is research output, not a clinical assessment.
              </p>
              <div className='text-[11px] font-mono text-electric-purple bg-navy-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 inline-block'>
                Binary Decision Hyperplane
              </div>
            </div>

            <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow hover:border-teal-500/30 transition-all'>
              <div className='w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4'>
                <Activity className='w-5 h-5' />
              </div>
              <h3 className='text-base font-bold text-white mb-2'>
                SHAP Explainability
              </h3>
              <p className='text-xs sm:text-sm text-slate-400 leading-relaxed mb-4'>
                Game-theoretic SHapley Additive exPlanations quantify the exact directional influence of each biomarker, isolating positive risks from protective clinical factors.
              </p>
              <div className='text-[11px] font-mono text-teal-300 bg-navy-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 inline-block'>
                Transparent Feature Attributions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Callout */}
      <section className='py-12 bg-navy-900/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='space-y-1 text-center md:text-left'>
              <h3 className='text-lg sm:text-xl font-bold text-white'>
                Ready to evaluate a clinical case?
              </h3>
              <p className='text-xs sm:text-sm text-slate-400 max-w-xl'>
                Input patient biomarkers in the structured assessment form to view the model-predicted class and inspect granular SHAP attributions.
              </p>
            </div>

            <div className='flex items-center gap-3 shrink-0'>
              <Button
                to='/assessment'
                variant='primary'
                size='md'
                icon={ArrowRight}
                iconPosition='right'
                className='shadow-glow-cyan'
              >
                New Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
