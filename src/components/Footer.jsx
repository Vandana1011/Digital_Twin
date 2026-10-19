import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className='w-full bg-[#040614] border-t border-purple-950/50 text-[#9496b8] text-sm mt-auto' role='contentinfo'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <svg 
                  className='w-5 h-5 text-purple-400' 
                  viewBox='0 0 24 24' 
                  fill='none' 
                  stroke='currentColor' 
                  strokeWidth='2' 
                  strokeLinecap='round' 
                  strokeLinejoin='round'
                >
                  <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
                  <path d='M3.22 12H9.5l1.5-3 3 7 1.5-4h5.28' className='stroke-fuchsia-300' />
                </svg>
              </div>
              <span className='text-lg font-bold text-white tracking-tight'>
                CardioTwin <span className='text-purple-400 font-extrabold'>AI</span>
              </span>
            </div>

            <p className='text-[#9496b8] text-xs sm:text-sm leading-relaxed max-w-sm'>
              AI-powered cardiovascular risk assessment coupling machine learning with explainable SHAP feature attribution for transparent clinical insights.
            </p>
          </div>

          <div className='space-y-3'>
            <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-slate-200'>
              Navigation
            </h4>
            <ul className='space-y-2 text-xs'>
              <li>
                <Link to='/' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-400' />
                  Home
                </Link>
              </li>
              <li>
                <Link to='/predict' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-400' />
                  Predict
                </Link>
              </li>
              <li>
                <Link to='/explain' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-400' />
                  Explain
                </Link>
              </li>
              <li>
                <Link to='/history' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-purple-400' />
                  History
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-slate-200'>
              Resources
            </h4>
            <ul className='space-y-2 text-xs text-[#9496b8]'>
              <li>
                <Link to='/dashboard' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-electric-blue' />
                  Clinical Dashboard
                </Link>
              </li>
              <li>
                <Link to='/performance' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-electric-blue' />
                  Model Performance
                </Link>
              </li>
              <li>
                <Link to='/how-it-works' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-electric-magenta' />
                  How It Works
                </Link>
              </li>
              <li>
                <Link to='/about' className='hover:text-purple-300 transition-colors flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-slate-400' />
                  About CardioTwin AI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-6 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9496b8]'>
          <div>
            © {currentYear} CardioTwin AI. All rights reserved.
          </div>
          <div className='flex items-center gap-4 text-purple-300/80'>
            <span>WCAG AA Compliant</span>
            <span>•</span>
            <span>Explainable AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
