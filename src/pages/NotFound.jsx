import { Home, Activity } from 'lucide-react';
import Button from '../components/Button';

export const NotFound = () => {
  return (
    <div className='flex-1 flex items-center justify-center bg-[#040614] py-16 px-4'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='relative mx-auto w-24 h-24 rounded-3xl bg-[#070b24] border border-purple-500/30 flex items-center justify-center shadow-card-glow'>
          <Activity className='w-10 h-10 text-purple-400 animate-pulse' />
          <span className='absolute -top-1 -right-1 flex h-4 w-4'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-4 w-4 bg-fuchsia-500'></span>
          </span>
        </div>

        <div className='space-y-2'>
          <span className='text-xs font-mono font-bold uppercase tracking-widest text-purple-400'>
            Error 404 • Signal Lost
          </span>
          <h1 className='text-3xl font-extrabold text-white tracking-tight'>
            Biomarker Locus Not Found
          </h1>
          <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed'>
            The requested cardiovascular telemetry vector or route does not exist within the CardioTwin AI research namespace.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 pt-2'>
          <Button
            to='/'
            variant='primary'
            size='md'
            icon={Home}
            className='shadow-glow-purple rounded-full px-6'
          >
            Return to Home
          </Button>

          <Button
            to='/dashboard'
            variant='secondary'
            size='md'
            className='rounded-full px-6'
          >
            Open Dashboard
          </Button>
        </div>

        <div className='pt-6 border-t border-purple-950/60 text-[11px] font-mono text-purple-300/80'>
          CardioTwin AI Research Sandbox • Status: 404
        </div>
      </div>
    </div>
  );
};

export default NotFound;
