import { ShieldCheck } from 'lucide-react';

const disclaimerText = 'CardioTwin AI is a research prototype for educational purposes only. It is not a medical device and must not be used for clinical diagnosis or treatment decisions.';

export const Disclaimer = ({
  className = '',
}) => {
  return (
    <div 
      className={`w-full bg-[#070b24]/90 border border-purple-500/30 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_0_20px_rgba(168,85,247,0.12)] backdrop-blur-md ${className}`}
      role='banner'
      aria-label='Research Prototype Disclaimer'
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='p-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.2)]'>
            <ShieldCheck className='w-4 h-4' />
          </div>
          <div className='text-xs sm:text-sm text-slate-300 font-medium leading-snug'>
            <span className='font-bold text-purple-300 uppercase tracking-wider text-[11px] sm:text-xs mr-2 px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30'>
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
