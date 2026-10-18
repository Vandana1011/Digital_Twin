import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Disclaimer from './Disclaimer';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className='w-full bg-navy-950 border-t border-slate-800/80 text-slate-400 text-sm mt-auto' role='contentinfo'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
        
        {/* Mandatory Research Disclaimer Box */}
        <div className='mb-12'>
          <Disclaimer variant='footer' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12'>
          {/* Brand & Introduction */}
          <div className='md:col-span-2 space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
                <Heart className='w-5 h-5 fill-cyan-400/20' />
              </div>
              <span className='text-lg font-bold text-white tracking-tight'>
                CardioTwin<span className='text-cyan-400'>AI</span>
              </span>
              <span className='px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'>
                Research Prototype
              </span>
            </div>

            <p className='text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md'>
              A doctor-friendly research prototype coupling Support Vector Classification (SVC) with game-theoretic SHAP feature attributions for transparent cardiovascular risk evaluation.
            </p>

            <div className='text-xs text-slate-500 font-mono'>
              Dataset: UCI Machine Learning Repository • Cleveland Clinic Foundation (N=303)
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-3'>
            <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-slate-200'>
              Application Navigation
            </h4>
            <ul className='space-y-2 text-xs'>
              <li>
                <Link to='/' className='hover:text-cyan-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-cyan-400' />
                  Home Page
                </Link>
              </li>
              <li>
                <Link to='/dashboard' className='hover:text-cyan-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-cyan-400' />
                  Clinical Intelligence Dashboard
                </Link>
              </li>
              <li>
                <Link to='/assessment' className='hover:text-rose-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-rose-500' />
                  New Heart Assessment
                </Link>
              </li>
              <li>
                <Link to='/results' className='hover:text-cyan-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-cyan-400' />
                  Prediction Results
                </Link>
              </li>
              <li>
                <Link to='/shap' className='hover:text-electric-purple transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-electric-purple' />
                  SHAP Explanation
                </Link>
              </li>
              <li>
                <Link to='/performance' className='hover:text-emerald-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
                  Model Performance (N=61)
                </Link>
              </li>
              <li>
                <Link to='/how-it-works' className='hover:text-teal-400 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-teal-400' />
                  How It Works (5 Stages)
                </Link>
              </li>
              <li>
                <Link to='/about' className='hover:text-slate-200 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-slate-400' />
                  About CardioTwin AI
                </Link>
              </li>
              <li>
                <Link to='/history' className='hover:text-slate-200 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-slate-400' />
                  Assessment History
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Compliance */}
          <div className='space-y-3'>
            <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-slate-200'>
              Machine Learning Stack
            </h4>
            <ul className='space-y-2 text-xs text-slate-400'>
              <li className='flex items-center gap-2'>
                <span className='text-cyan-400 font-mono'>Classifier:</span>
                <span>SVC (RBF Kernel, Scikit-learn)</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-electric-purple font-mono'>Explainability:</span>
                <span>SHAP Additive Attribution</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-teal-400 font-mono'>Evaluation:</span>
                <span>88.5% Accuracy • 0.961 ROC-AUC</span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-rose-400 font-mono'>Frontend:</span>
                <span>React, Tailwind CSS, Vite</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Compliance Sub-footer */}
        <div className='pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400'>
          <div>
            © {currentYear} CardioTwin AI Research Project. Academic & Research Evaluation Prototype.
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-slate-400'>WCAG AA Contrast Compliant</span>
            <span>•</span>
            <span className='text-slate-400'>Decoupled API Contract</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
