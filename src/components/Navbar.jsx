import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Lightbulb, 
  Clock, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isPredictActive = ['/predict', '/assessment', '/results'].includes(location.pathname);
  const isExplainActive = ['/explain', '/shap'].includes(location.pathname);
  const isHistoryActive = location.pathname === '/history';

  return (
    <header className='sticky top-0 z-40 w-full backdrop-blur-xl bg-[#040614]/85 border-b border-purple-950/40 transition-all duration-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-18'>
          
          <Link 
            to='/' 
            className='flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl p-1'
            aria-label='CardioTwin AI Home'
          >
            <div className='relative p-2 rounded-xl bg-purple-950/40 border border-purple-500/40 group-hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300'>
              <svg 
                className='w-5 h-5 text-purple-400 group-hover:scale-105 transition-transform' 
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

            <div>
              <span className='text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors'>
                CardioTwin <span className='text-purple-400 font-extrabold'>AI</span>
              </span>
            </div>
          </Link>

          <nav className='hidden md:flex items-center gap-6 lg:gap-8' aria-label='Main Navigation'>
            <NavLink 
              to='/' 
              end 
              className='relative py-2 text-sm font-medium transition-colors flex items-center gap-2 group'
            >
              <Home className={`w-4 h-4 transition-colors ${isHomeActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-200'}`} />
              <span className={isHomeActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}>
                Home
              </span>
              {isHomeActive && (
                <span className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 rounded-full shadow-[0_0_10px_#a855f7]' />
              )}
            </NavLink>

            <NavLink 
              to='/predict' 
              className='relative py-2 text-sm font-medium transition-colors flex items-center gap-2 group'
            >
              <Activity className={`w-4 h-4 transition-colors ${isPredictActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-200'}`} />
              <span className={isPredictActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}>
                Predict
              </span>
              {isPredictActive && (
                <span className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 rounded-full shadow-[0_0_10px_#a855f7]' />
              )}
            </NavLink>

            <NavLink 
              to='/explain' 
              className='relative py-2 text-sm font-medium transition-colors flex items-center gap-2 group'
            >
              <Lightbulb className={`w-4 h-4 transition-colors ${isExplainActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-200'}`} />
              <span className={isExplainActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}>
                Explain
              </span>
              {isExplainActive && (
                <span className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 rounded-full shadow-[0_0_10px_#a855f7]' />
              )}
            </NavLink>

            <NavLink 
              to='/history' 
              className='relative py-2 text-sm font-medium transition-colors flex items-center gap-2 group'
            >
              <Clock className={`w-4 h-4 transition-colors ${isHistoryActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-200'}`} />
              <span className={isHistoryActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}>
                History
              </span>
              {isHistoryActive && (
                <span className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 rounded-full shadow-[0_0_10px_#a855f7]' />
              )}
            </NavLink>
          </nav>

          <div className='md:hidden flex items-center'>
            <button
              type='button'
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-950/40 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400'
              aria-label='Toggle navigation menu'
              aria-expanded={isOpen}
            >
              {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className='md:hidden border-b border-purple-950/60 bg-[#070b24]/95 backdrop-blur-2xl animate-fade-in'>
          <div className='px-4 pt-3 pb-4 space-y-1.5'>
            <NavLink
              to='/'
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-purple-600/20 text-white font-semibold border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <Home className='w-4 h-4 text-purple-400' />
              <span>Home</span>
            </NavLink>

            <NavLink
              to='/predict'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-purple-600/20 text-white font-semibold border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <Activity className='w-4 h-4 text-purple-400' />
              <span>Predict</span>
            </NavLink>

            <NavLink
              to='/explain'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-purple-600/20 text-white font-semibold border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <Lightbulb className='w-4 h-4 text-purple-400' />
              <span>Explain</span>
            </NavLink>

            <NavLink
              to='/history'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-purple-600/20 text-white font-semibold border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <Clock className='w-4 h-4 text-purple-400' />
              <span>History</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
