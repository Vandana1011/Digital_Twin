import { 
  Heart, 
  Target, 
  Lightbulb, 
  Cpu, 
  Database, 
  Scale, 
  AlertTriangle, 
  ShieldAlert, 
  Code2, 
  Sparkles
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';

export const About = () => {
  const techStack = [
    { name: 'Python', role: 'Core Scientific Programming Language', category: 'Backend / Modeling' },
    { name: 'Pandas & NumPy', role: 'Data Manipulation & Feature Matrix Vectorization', category: 'Data Engineering' },
    { name: 'Scikit-learn', role: 'Support Vector Classifier (SVC - RBF Kernel) Pipeline', category: 'Machine Learning' },
    { name: 'SHAP (Lundberg & Lee)', role: 'Cooperative Game-Theoretic Additive Feature Attribution', category: 'Explainable AI' },
    { name: 'React & Vite', role: 'High-Performance Frontend Component Architecture', category: 'User Interface' },
    { name: 'Tailwind CSS', role: 'Accessible Medical Dark-Theme Tokens & Design System', category: 'Styling' },
  ];

  const limitations = [
    {
      title: 'Small Historical Sample Size',
      desc: 'The underlying Cleveland Clinic dataset comprises 303 complete patient records collected in 1988. While ideal for algorithmic benchmark research, modern deep learning architectures and larger prospective cohorts are required for clinical validation.',
    },
    {
      title: 'Geographic and Demographic Specificity',
      desc: 'The cohort represents patients admitted to a single tertiary care center in Cleveland, Ohio, with a significant male biological predominance (68%). It does not encapsulate broader global population demographics.',
    },
    {
      title: 'Binary Categorization Trade-off',
      desc: 'Collapsing clinical coronary stenosis grades (1, 2, 3, and 4) into a single binary Class 1 is necessary for robust classification on limited samples, but eliminates distinction between single-vessel and severe multi-vessel disease.',
    },
    {
      title: 'Non-Interfaced Research Prototype',
      desc: 'CardioTwin AI does not interface with hospital EHR systems or live physiological telemetry monitors. It operates solely on discrete biomarker entries provided in the assessment form.',
    },
  ];

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-950/60'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <Heart className='w-5 h-5 fill-purple-400/20' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                About CardioTwin AI
              </h1>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/50 text-purple-300 border border-purple-500/30'>
                Academic Research
              </span>
            </div>
            <p className='text-xs sm:text-sm text-[#9496b8]'>
              Research objectives, explainable machine learning methodology, and academic scope.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              to='/dashboard'
              variant='secondary'
              size='sm'
              className='rounded-full px-5'
            >
              Dashboard
            </Button>
            <Button
              to='/predict'
              variant='primary'
              size='sm'
              icon={Sparkles}
              className='shadow-glow-purple rounded-full px-5'
            >
              New Assessment
            </Button>
          </div>
        </div>

        <Disclaimer />

        <div className='rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#070b24] via-[#0c1236] to-[#070b24] border border-purple-500/30 shadow-card-glow space-y-4'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-semibold'>
            <Sparkles className='w-3.5 h-3.5 text-purple-400' />
            <span>Project Introduction</span>
          </div>

          <h2 className='text-xl sm:text-2xl font-extrabold text-white tracking-tight'>
            Explainable AI for Cardiovascular Decision Support
          </h2>

          <p className='text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl'>
            CardioTwin AI is an academic and clinical prototype developed to demonstrate how state-of-the-art machine learning models can be paired with game-theoretic explainability (SHAP) to provide transparent, doctor-friendly decision support. Rather than presenting clinicians with opaque risk percentages or black-box outputs, CardioTwin AI isolates the exact clinical biomarkers influencing the model’s prediction.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2.5 text-rose-400 font-bold text-sm'>
              <Target className='w-4 h-4' />
              <span>Problem Statement</span>
            </div>
            <h3 className='text-base font-bold text-white'>
              The Clinical "Black-Box" Barrier
            </h3>
            <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
              Coronary artery disease remains the leading cause of global morbidity and mortality. While machine learning classifiers frequently achieve high retrospective accuracy on benchmark datasets, clinical adoption in healthcare remains low because conventional models operate as black boxes: clinicians cannot inspect <em>why</em> a specific patient was flagged as high-risk, impeding clinical verification and patient safety.
            </p>
          </div>

          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2.5 text-purple-400 font-bold text-sm'>
              <Lightbulb className='w-4 h-4' />
              <span>Project Objective</span>
            </div>
            <h3 className='text-base font-bold text-white'>
              Transparent & Auditable Clinical AI
            </h3>
            <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
              The primary goal of CardioTwin AI is to develop a doctor-friendly, auditable interface that couples a calibrated Support Vector Classifier with SHapley Additive exPlanations (SHAP). This empowers physicians and evaluators to immediately examine the positive risk factors and protective negative factors behind every prediction, fostering clinical trust and pedagogical research.
            </p>
          </div>
        </div>

        <div className='rounded-3xl p-6 sm:p-8 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex items-center gap-2.5 text-purple-400 font-bold text-sm'>
            <Cpu className='w-4 h-4' />
            <span>Methodological Foundation</span>
          </div>

          <h2 className='text-lg sm:text-xl font-bold text-white tracking-tight'>
            Overview of Explainable AI (XAI) & SHAP
          </h2>

          <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed max-w-4xl'>
            SHAP (SHapley Additive exPlanations) is a cooperative game-theoretic framework introduced by Lundberg and Lee (2017) that calculates the marginal contribution of each feature to the machine learning prediction. In CardioTwin AI:
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs'>
            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-purple-300 font-sans block'>Additive Efficiency</span>
              <p className='text-[#9496b8] font-sans leading-relaxed'>
                The sum of all feature SHAP attributions plus the model base intercept strictly equals the model hyperplane decision function.
              </p>
            </div>

            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-fuchsia-300 font-sans block'>Directional Attribution</span>
              <p className='text-[#9496b8] font-sans leading-relaxed'>
                Distinguishes features that elevate disease probability (positive SHAP) from protective clinical markers (negative SHAP).
              </p>
            </div>

            <div className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
              <span className='font-bold text-electric-blue font-sans block'>Clinical Auditability</span>
              <p className='text-[#9496b8] font-sans leading-relaxed'>
                Allows physicians to confirm that the model relies on biologically sound indicators (e.g. ST depression, fluoroscopy vessels) rather than spurious noise.
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2.5 text-emerald-400 font-bold text-sm'>
              <Database className='w-4 h-4' />
              <span>Dataset Source</span>
            </div>
            <h3 className='text-base font-bold text-white'>
              UCI Heart Disease Repository (Cleveland)
            </h3>
            <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
              The dataset originates from the Cleveland Clinic Foundation (Dr. Robert Detrano, MD, PhD). It contains 303 patient records with 13 non-invasive clinical biomarkers and gold-standard coronary angiography ground-truth labels.
            </p>
            <div className='pt-2 flex items-center gap-3 text-xs font-mono text-purple-300/80'>
              <span>Instances: 303</span>
              <span>•</span>
              <span>Features: 13</span>
              <span>•</span>
              <span>Year: 1988</span>
            </div>
          </div>

          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-3'>
            <div className='flex items-center gap-2.5 text-purple-400 font-bold text-sm'>
              <Scale className='w-4 h-4' />
              <span>Classification Task</span>
            </div>
            <h3 className='text-base font-bold text-white'>
              Standardized Binary Mapping
            </h3>
            <div className='space-y-2 text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
              <p>
                The original UCI Cleveland dataset contains an angiographic severity target ranging from 0 to 4:
              </p>
              <ul className='space-y-1 font-mono text-xs text-slate-300'>
                <li className='flex items-start gap-2'>
                  <span className='text-emerald-400 font-bold'>Class 0:</span>
                  <span>Absence of CAD (original UCI target value 0; &lt;50% diameter stenosis).</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-fuchsia-400 font-bold'>Class 1:</span>
                  <span>Presence of CAD (original UCI targets 1, 2, 3, and 4 combined; &ge;50% diameter stenosis in major vessels).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
          <div className='flex items-center justify-between pb-3 border-b border-purple-950/60'>
            <div className='flex items-center gap-2 text-white font-bold text-sm'>
              <Code2 className='w-4 h-4 text-purple-400' />
              <span>Technology Stack & Computational Libraries</span>
            </div>
            <span className='text-xs font-mono text-purple-300/80'>
              Research Architecture
            </span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs'>
            {techStack.map((tech, idx) => (
              <div key={idx} className='p-3.5 rounded-2xl bg-navy-950/70 border border-purple-500/15 space-y-1'>
                <div className='flex items-center justify-between'>
                  <span className='font-bold text-purple-300 font-sans'>{tech.name}</span>
                  <span className='text-[10px] text-[#9496b8]'>{tech.category}</span>
                </div>
                <p className='text-[11px] text-[#9496b8] font-sans'>
                  {tech.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl p-6 sm:p-8 bg-[#070b24]/80 border border-amber-500/30 shadow-card-glow space-y-4'>
          <div className='flex items-center gap-2.5 text-amber-300 font-bold text-sm'>
            <AlertTriangle className='w-4 h-4 text-amber-400' />
            <span>Known Limitations of the Research Prototype</span>
          </div>

          <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
            In accordance with best practices for clinical AI research, the following known constraints must be recognized:
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs'>
            {limitations.map((lim, i) => (
              <div key={i} className='p-4 rounded-2xl bg-navy-950/80 border border-purple-500/15 space-y-1.5'>
                <span className='font-bold text-amber-300 block'>{lim.title}</span>
                <p className='text-slate-300 leading-relaxed'>{lim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl p-6 bg-[#070b24]/90 border border-rose-500/30 shadow-card-glow space-y-3'>
          <div className='flex items-center gap-2 text-rose-300 font-bold text-sm'>
            <ShieldAlert className='w-5 h-5 text-rose-400' />
            <span>Formal Medical & Legal Disclaimer</span>
          </div>
          <p className='text-xs text-[#9496b8] leading-relaxed font-sans'>
            CardioTwin AI is strictly an academic demonstration prototype intended solely for educational, algorithmic research, and exploratory evaluation. It is not an FDA-cleared, CE-marked, or clinically certified medical software. The classifications and SHAP attributions generated by this system must not be used as clinical diagnostic advice, therapeutic recommendations, or substitutes for evaluation by licensed physicians. The developers and researchers assume no liability for actions taken on the basis of model outputs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
