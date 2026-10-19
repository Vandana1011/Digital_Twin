import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Activity, 
  HeartPulse
} from 'lucide-react';
import AnatomicalHeart from '../components/AnatomicalHeart';
import Button from '../components/Button';

export const Home = () => {
  return (
    <div className='flex-1 flex flex-col justify-between overflow-hidden bg-[#040614] text-slate-100 min-h-0 relative h-full'>
      <section className='relative overflow-hidden flex-1 flex flex-col justify-between min-h-0 pt-1 lg:pt-3 h-full'>
        <div 
          className='absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[380px] bg-gradient-to-tr from-purple-700/15 via-indigo-600/10 to-transparent rounded-full blur-[100px] pointer-events-none' 
          aria-hidden='true' 
        />
        <div 
          className='absolute top-1/4 right-10 w-[450px] h-[380px] bg-gradient-to-bl from-electric-blue/15 via-purple-600/20 to-transparent rounded-full blur-[120px] pointer-events-none' 
          aria-hidden='true' 
        />
        <div 
          className='absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none' 
          aria-hidden='true' 
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center min-h-0 py-1 sm:py-2'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full'>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='lg:col-span-6 text-center lg:text-left space-y-3.5 sm:space-y-4 z-10'
            >
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-medium shadow-[0_0_15px_rgba(168,85,247,0.25)] backdrop-blur-md'>
                <Sparkles className='w-3.5 h-3.5 text-purple-400' />
                <span>AI-Powered Healthcare</span>
              </div>

              <h1 className='text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.08]'>
                CardioTwin <span className='text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]'>AI</span>
              </h1>

              <h2 className='text-xl sm:text-2xl lg:text-2xl font-bold text-slate-100 tracking-tight'>
                Smarter Insights. Healthier Hearts.
              </h2>

              <p className='text-xs sm:text-sm lg:text-base text-[#9496b8] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal'>
                CardioTwin AI uses machine learning to analyze heart health data and provide insights into the risk of heart disease — with explainable AI for greater transparency and trust.
              </p>

              <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1'>
                <Button
                  to='/predict'
                  variant='primary'
                  size='lg'
                  icon={Activity}
                  iconPosition='left'
                  className='rounded-full px-6 sm:px-7 py-2.5 sm:py-3 w-full sm:w-auto shadow-glow-purple text-white hover:scale-[1.02] text-sm'
                >
                  <span className='flex items-center gap-2'>
                    Explore CardioTwin AI
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </span>
                </Button>

                <Button
                  to='/how-it-works'
                  variant='secondary'
                  size='lg'
                  icon={BookOpen}
                  className='rounded-full px-6 sm:px-7 py-2.5 sm:py-3 w-full sm:w-auto border border-purple-500/50 bg-purple-950/25 text-purple-200 hover:text-white hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-sm'
                >
                  How It Works
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='lg:col-span-6 flex justify-center items-center relative min-h-0'
            >
              <AnatomicalHeart />
            </motion.div>
          </div>
        </div>

        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 shrink-0 w-full pt-1 pb-1'>
          <div className='relative flex items-center justify-center'>
            <div className='w-full border-t border-purple-500/25' />
            <div className='absolute px-4 bg-[#040614]'>
              <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-purple-500/50 bg-[#070b24] flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]'>
                <HeartPulse className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-[#9496b8] pt-2 font-medium'>
            <span>AI-Powered Insights</span>
            <span className='text-purple-400 font-bold'>•</span>
            <span>Explainable Predictions</span>
            <span className='text-purple-400 font-bold'>•</span>
            <span>Research Prototype</span>
          </div>
        </div>

        <div className='relative w-full overflow-hidden select-none pointer-events-none shrink-0 -mt-1'>
          <img
            src='/cardiotwin-waves-pure.png'
            alt='CardioTwin AI glowing decorative waves'
            className='w-full h-12 sm:h-16 lg:h-20 xl:h-24 object-cover object-top opacity-90'
            loading='eager'
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
