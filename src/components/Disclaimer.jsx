import { AlertTriangle } from 'lucide-react';

const disclaimerText = 'CardioTwin AI is a research prototype for educational purposes only. It is not a medical device and must not be used for diagnosis or treatment decisions.';

export const Disclaimer = ({
  variant = 'banner',
  className = '',
}) => {
  if (variant === 'footer') {
    return (
      <div 
        className={`p-4 rounded-lg bg-navy-900/60 border border-slate-800 text-xs text-slate-400 flex items-start sm:items-center gap-3 ${className}`}
        role='contentinfo'
      >
        <AlertTriangle className='w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0' />
        <p className='leading-normal'>
          <strong className='text-slate-300'>Notice: </strong>
          {disclaimerText}
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`w-full bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-y sm:border sm:rounded-xl border-amber-500/25 px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm ${className}`}
      role='banner'
      aria-label='Research Prototype Disclaimer'
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='p-1.5 rounded-md bg-amber-500/20 text-amber-300 shrink-0'>
            <AlertTriangle className='w-4 h-4' />
          </div>
          <div className='text-xs sm:text-sm text-amber-200/90 font-medium leading-snug'>
            <span className='font-bold text-amber-300 uppercase tracking-wider text-[11px] sm:text-xs mr-2 px-1.5 py-0.5 rounded bg-amber-500/20'>
              Research Prototype
            </span>
            {disclaimerText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
