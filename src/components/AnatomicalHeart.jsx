import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnatomicalHeart = ({ className = '' }) => {
  const [isBeating, setIsBeating] = useState(false);

  useEffect(() => {
    const beatInterval = setInterval(() => {
      setIsBeating(true);
      setTimeout(() => setIsBeating(false), 260);
    }, 1100);

    return () => clearInterval(beatInterval);
  }, []);

  return (
    <div className={`relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[580px] flex items-center justify-center select-none ${className}`}>
      <div 
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[80px] pointer-events-none'
        aria-hidden='true'
      />
      <div 
        className='absolute top-1/3 right-1/4 w-[220px] h-[220px] bg-electric-magenta/20 rounded-full blur-[70px] pointer-events-none'
        aria-hidden='true'
      />
      <div 
        className='absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-electric-blue/20 rounded-full blur-[70px] pointer-events-none'
        aria-hidden='true'
      />

      <motion.div
        animate={{
          scale: isBeating ? [1, 1.025, 0.992, 1] : 1,
          y: [0, -5, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.35, ease: 'easeOut' },
        }}
        className='relative z-10 w-full flex items-center justify-center'
      >
        <img
          src='/cardiotwin-heart-pristine.png'
          alt='CardioTwin AI 3D Anatomical Heart with dual blue and magenta neon illumination and ECG waveform'
          className='w-full h-auto object-contain max-h-[300px] sm:max-h-[360px] lg:max-h-[420px] xl:max-h-[460px] drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] mix-blend-screen'
          loading='eager'
        />
      </motion.div>
    </div>
  );
};

export default AnatomicalHeart;
