import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  LayoutDashboard, 
  Menu, 
  X, 
  Activity, 
  HeartPulse, 
  ChevronDown,
  Sparkles,
  BookOpen,
  Info,
  Clock,
  BarChart3,
  FileSearch
} from 'lucide-react';
import Button from './Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modulesDropdown, setModulesDropdown] = useState(false);
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsOpen(false);
    setModulesDropdown(false);
  }

  const navLinkClasses = ({ isActive }) =>
    `relative text-xs sm:text-sm font-medium transition-colors duration-200 py-1.5 px-3 rounded-lg flex items-center gap-1.5 ${
      isActive 
        ? 'text-cyan-300 bg-cyan-500/10 font-semibold' 
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`;

  const isToolsActive = ['/assessment', '/results', '/shap', '/performance', '/history'].some(
    (path) => location.pathname === path
  );

  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-xl bg-navy-950/85 border-b border-slate-800/80 transition-all duration-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 sm:h-20'>
          
          {/* Logo & Brand */}
          <Link 
            to='/' 
            className='flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl p-1'
            aria-label='CardioTwin AI Home'
          >
            <div className='relative p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 via-electric-purple/15 to-teal-500/10 border border-cyan-500/40 group-hover:border-cyan-400 shadow-glow-cyan/50 transition-all duration-300'>
              <Heart className='w-5 h-5 text-cyan-400 fill-cyan-400/30 group-hover:scale-110 transition-transform' />
              <Activity className='w-3 h-3 text-electric-purple absolute -bottom-0.5 -right-0.5 animate-pulse' />
            </div>

            <div>
              <div className='flex items-center gap-2'>
                <span className='text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-200 transition-colors'>
                  CardioTwin<span className='text-cyan-400'>AI</span>
                </span>
                <span className='hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'>
                  Prototype
                </span>
              </div>
              <span className='hidden md:block text-[11px] text-slate-400 -mt-0.5 tracking-wide'>
                Explainable Heart Disease AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-1' aria-label='Main Navigation'>
            <NavLink to='/' end className={navLinkClasses}>
              <span>Home</span>
            </NavLink>

            <NavLink to='/dashboard' className={navLinkClasses}>
              <LayoutDashboard className='w-3.5 h-3.5 text-cyan-400' />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to='/assessment' className={navLinkClasses}>
              <HeartPulse className='w-3.5 h-3.5 text-rose-400' />
              <span>Assessment</span>
            </NavLink>

            {/* Analysis & Explainability Dropdown */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => setModulesDropdown(!modulesDropdown)}
                onBlur={() => setTimeout(() => setModulesDropdown(false), 220)}
                className={`relative text-xs sm:text-sm font-medium transition-colors duration-200 py-1.5 px-3 rounded-lg flex items-center gap-1.5 ${
                  isToolsActive
                    ? 'text-cyan-300 bg-cyan-500/10 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={modulesDropdown}
                aria-haspopup='true'
              >
                <span>Evaluation Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${modulesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {modulesDropdown && (
                <div className='absolute top-full left-0 mt-2 w-72 rounded-2xl bg-navy-900 border border-slate-700/80 shadow-2xl p-2 z-50 backdrop-blur-2xl space-y-1'>
                  <Link
                    to='/results'
                    className='flex items-start gap-3 p-2.5 rounded-xl hover:bg-cyan-500/10 transition-colors group'
                  >
                    <div className='p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform mt-0.5'>
                      <Activity className='w-4 h-4' />
                    </div>
                    <div>
                      <div className='text-xs font-bold text-slate-200 group-hover:text-cyan-300'>
                        Prediction Results
                      </div>
                      <div className='text-[11px] text-slate-400'>
                        Class 0 / Class 1 binary output
                      </div>
                    </div>
                  </Link>

                  <Link
                    to='/shap'
                    className='flex items-start gap-3 p-2.5 rounded-xl hover:bg-electric-purple/10 transition-colors group'
                  >
                    <div className='p-1.5 rounded-lg bg-electric-purple/15 text-electric-purple border border-electric-purple/30 group-hover:scale-105 transition-transform mt-0.5'>
                      <FileSearch className='w-4 h-4' />
                    </div>
                    <div>
                      <div className='text-xs font-bold text-slate-200 group-hover:text-purple-300'>
                        SHAP Explanation
                      </div>
                      <div className='text-[11px] text-slate-400'>
                        Why This Prediction? feature contributions
                      </div>
                    </div>
                  </Link>

                  <Link
                    to='/performance'
                    className='flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group'
                  >
                    <div className='p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform mt-0.5'>
                      <BarChart3 className='w-4 h-4' />
                    </div>
                    <div>
                      <div className='text-xs font-bold text-slate-200 group-hover:text-emerald-300'>
                        Model Performance
                      </div>
                      <div className='text-[11px] text-slate-400'>
                        Confusion matrix, ROC curve, N=61 metrics
                      </div>
                    </div>
                  </Link>

                  <Link
                    to='/history'
                    className='flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-colors group'
                  >
                    <div className='p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 group-hover:scale-105 transition-transform mt-0.5'>
                      <Clock className='w-4 h-4' />
                    </div>
                    <div>
                      <div className='text-xs font-bold text-slate-200 group-hover:text-white'>
                        Assessment History
                      </div>
                      <div className='text-[11px] text-slate-400'>
                        Locally recorded evaluation audit trail
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink to='/how-it-works' className={navLinkClasses}>
              <BookOpen className='w-3.5 h-3.5 text-teal-400' />
              <span>How It Works</span>
            </NavLink>

            <NavLink to='/about' className={navLinkClasses}>
              <Info className='w-3.5 h-3.5 text-slate-400' />
              <span>About</span>
            </NavLink>
          </nav>

          {/* Right Action Button */}
          <div className='flex items-center gap-3'>
            <Button
              to='/assessment'
              variant='primary'
              size='sm'
              icon={Sparkles}
              className='hidden sm:inline-flex shadow-glow-cyan'
            >
              Start Assessment
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              type='button'
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              aria-label='Toggle navigation menu'
              aria-expanded={isOpen}
            >
              {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className='md:hidden bg-navy-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl'>
          <div className='space-y-1'>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-cyan-500/10 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-cyan-500/10 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to='/assessment'
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-rose-500/10 text-rose-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                }`
              }
            >
              Heart Assessment
            </NavLink>

            <div className='pt-2 pb-1 border-t border-slate-800'>
              <span className='px-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1'>
                Evaluation Tools
              </span>
              <NavLink
                to='/results'
                className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300'
              >
                <Activity className='w-4 h-4 text-cyan-400' />
                <span>Prediction Results</span>
              </NavLink>

              <NavLink
                to='/shap'
                className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-electric-purple/10 hover:text-purple-300'
              >
                <FileSearch className='w-4 h-4 text-electric-purple' />
                <span>SHAP Explanation</span>
              </NavLink>

              <NavLink
                to='/performance'
                className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300'
              >
                <BarChart3 className='w-4 h-4 text-emerald-400' />
                <span>Model Performance</span>
              </NavLink>

              <NavLink
                to='/history'
                className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800'
              >
                <Clock className='w-4 h-4 text-slate-400' />
                <span>Assessment History</span>
              </NavLink>
            </div>

            <div className='pt-2 pb-1 border-t border-slate-800'>
              <NavLink
                to='/how-it-works'
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-cyan-500/10 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                  }`
                }
              >
                How It Works
              </NavLink>

              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-cyan-500/10 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                  }`
                }
              >
                About CardioTwin AI
              </NavLink>
            </div>
          </div>

          <div className='pt-3 border-t border-slate-800'>
            <Button
              to='/assessment'
              variant='primary'
              size='md'
              className='w-full'
            >
              Start New Assessment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
