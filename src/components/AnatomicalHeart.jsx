import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export const AnatomicalHeart = ({ className = '' }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ));
  const [bpm, setBpm] = useState(72);
  const [isBeating, setIsBeating] = useState(false);
  const [activeZone, setActiveZone] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const beatInterval = setInterval(() => {
      setIsBeating(true);
      setTimeout(() => setIsBeating(false), 300);
    }, 1150);

    return () => clearInterval(beatInterval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const rateInterval = setInterval(() => {
      setBpm((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next >= 69 && next <= 75 ? next : 72;
      });
    }, 4000);

    return () => clearInterval(rateInterval);
  }, [prefersReducedMotion]);

  // Lead-II ECG path coordinates
  const ecgPath = 'M 0 45 L 60 45 Q 75 45 85 38 Q 95 32 105 38 Q 115 45 130 45 L 150 45 L 160 55 L 175 8 L 190 85 L 200 45 L 220 45 Q 240 45 255 30 Q 270 15 285 30 Q 300 45 330 45 L 430 45 Q 445 45 455 38 Q 465 32 475 38 Q 485 45 500 45 L 520 45 L 530 55 L 545 8 L 560 85 L 570 45 L 590 45 Q 610 45 625 30 Q 640 15 655 30 Q 670 45 700 45 L 760 45';

  return (
    <div className={`relative w-full max-w-lg mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-900/90 via-navy-850/80 to-navy-900/90 border border-slate-700/60 shadow-2xl backdrop-blur-2xl overflow-hidden ${className}`}>
      {/* Background ambient medical glows */}
      <div 
        className='absolute -top-20 -left-20 w-64 h-64 bg-electric-blue/15 rounded-full blur-3xl pointer-events-none' 
        aria-hidden='true' 
      />
      <div 
        className='absolute top-1/3 -right-20 w-64 h-64 bg-electric-purple/20 rounded-full blur-3xl pointer-events-none' 
        aria-hidden='true' 
      />
      <div 
        className='absolute -bottom-20 left-1/3 w-64 h-64 bg-electric-pink/10 rounded-full blur-3xl pointer-events-none' 
        aria-hidden='true' 
      />

      {/* Header bar with telemetry indicator */}
      <div className='relative flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4'>
        <div className='flex items-center gap-2.5'>
          <div className='relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
            <Heart className='w-4 h-4 fill-cyan-400/20' />
            <span className='absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-bold tracking-wider uppercase text-cyan-300'>
                Anatomical Digital Twin
              </span>
              <span className='px-1.5 py-0.5 rounded text-[10px] font-mono bg-electric-purple/15 text-electric-purple border border-electric-purple/30 font-semibold'>
                Hemodynamic Sync
              </span>
            </div>
            <p className='text-[11px] text-slate-400 font-sans'>
              Interactive 3D-shaded myocardial rendering
            </p>
          </div>
        </div>

        <div className='flex items-baseline gap-1 font-mono text-right'>
          <span className='text-2xl font-black text-white tracking-tight'>{bpm}</span>
          <span className='text-[10px] text-cyan-400 font-bold uppercase'>BPM</span>
        </div>
      </div>

      {/* Large Anatomical Heart SVG Graphic */}
      <div className='relative w-full aspect-[4/3] flex items-center justify-center my-1'>
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: isBeating ? [1, 1.04, 0.99, 1] : 1,
            filter: isBeating 
              ? 'drop-shadow(0 0 25px rgba(0, 210, 255, 0.45)) drop-shadow(0 0 45px rgba(168, 85, 247, 0.35))'
              : 'drop-shadow(0 0 15px rgba(0, 210, 255, 0.2)) drop-shadow(0 0 25px rgba(168, 85, 247, 0.15))',
          }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className='w-full h-full flex items-center justify-center relative'
        >
          <svg
            viewBox='0 0 480 400'
            className='w-full h-full max-h-[340px] overflow-visible select-none'
            role='img'
            aria-label='Glowing anatomical heart visualization with highlighted aorta, ventricles, and coronary arteries'
          >
            <defs>
              {/* Gradients */}
              <linearGradient id='aortaGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#a855f7' stopOpacity='0.95' />
                <stop offset='60%' stopColor='#d946ef' stopOpacity='0.85' />
                <stop offset='100%' stopColor='#f43f5e' stopOpacity='0.75' />
              </linearGradient>

              <linearGradient id='pulmonaryGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#00d2ff' stopOpacity='0.95' />
                <stop offset='70%' stopColor='#2563eb' stopOpacity='0.85' />
                <stop offset='100%' stopColor='#1e1b4b' stopOpacity='0.8' />
              </linearGradient>

              <linearGradient id='myocardiumGrad' x1='20%' y1='10%' x2='80%' y2='90%'>
                <stop offset='0%' stopColor='#1e293b' stopOpacity='0.95' />
                <stop offset='30%' stopColor='#172554' stopOpacity='0.95' />
                <stop offset='70%' stopColor='#1e1b4b' stopOpacity='0.95' />
                <stop offset='100%' stopColor='#0f172a' stopOpacity='0.98' />
              </linearGradient>

              <linearGradient id='coronaryGlow' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#00e5ff' />
                <stop offset='50%' stopColor='#38bdf8' />
                <stop offset='100%' stopColor='#f43f5e' />
              </linearGradient>

              <radialGradient id='ventricleDepth' cx='50%' cy='55%' r='50%'>
                <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.25' />
                <stop offset='50%' stopColor='#8b5cf6' stopOpacity='0.15' />
                <stop offset='100%' stopColor='transparent' stopOpacity='0' />
              </radialGradient>

              {/* Filters for neon glow */}
              <filter id='heartBloom' x='-25%' y='-25%' width='150%' height='150%'>
                <feGaussianBlur stdDeviation='5' result='blur' />
                <feMerge>
                  <feMergeNode in='blur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>

              <filter id='arteryGlow' x='-30%' y='-30%' width='160%' height='160%'>
                <feGaussianBlur stdDeviation='3' result='glow' />
                <feMerge>
                  <feMergeNode in='glow' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>

            {/* Depth background shadow */}
            <ellipse cx='240' cy='360' rx='130' ry='18' fill='rgba(0, 210, 255, 0.08)' filter='blur(10px)' />

            {/* 1. Superior Vena Cava (Right Upper Vessel) */}
            <g
              className='cursor-pointer transition-opacity duration-200'
              onMouseEnter={() => setActiveZone('Superior Vena Cava (SVC)')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <path
                d='M 170 120 L 170 50 Q 185 45 200 50 L 200 120 Z'
                fill='url(#pulmonaryGrad)'
                stroke='#00d2ff'
                strokeWidth='1.5'
                opacity='0.9'
              />
            </g>

            {/* 2. Pulmonary Artery Trunk & Branches */}
            <g
              className='cursor-pointer transition-opacity duration-200'
              onMouseEnter={() => setActiveZone('Pulmonary Trunk & Arteries')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <path
                d='M 235 155 Q 230 115 250 95 Q 275 75 310 85 L 320 102 Q 285 92 265 110 Q 255 125 255 160 Z'
                fill='url(#pulmonaryGrad)'
                stroke='#38bdf8'
                strokeWidth='1.5'
              />
              <path
                d='M 235 130 Q 215 105 160 105 L 160 88 Q 220 88 248 115 Z'
                fill='url(#pulmonaryGrad)'
                stroke='#38bdf8'
                strokeWidth='1'
                opacity='0.85'
              />
            </g>

            {/* 3. Aortic Arch with 3 Branching Arteries */}
            <g
              className='cursor-pointer transition-opacity duration-200'
              onMouseEnter={() => setActiveZone('Aortic Arch & Brachiocephalic Trunks')}
              onMouseLeave={() => setActiveZone(null)}
            >
              {/* Brachiocephalic artery branch */}
              <path d='M 225 65 L 220 28 Q 228 25 235 28 L 235 60 Z' fill='url(#aortaGrad)' stroke='#f43f5e' strokeWidth='1.2' />
              {/* Left common carotid artery */}
              <path d='M 245 60 L 250 22 Q 257 20 264 22 L 260 62 Z' fill='url(#aortaGrad)' stroke='#f43f5e' strokeWidth='1.2' />
              {/* Left subclavian artery */}
              <path d='M 270 65 L 282 28 Q 289 28 295 32 L 285 75 Z' fill='url(#aortaGrad)' stroke='#f43f5e' strokeWidth='1.2' />

              {/* Main curved Aorta tube */}
              <path
                d='M 205 145 Q 200 50 255 45 Q 310 40 325 110 Q 320 160 295 180 Q 280 150 280 115 Q 275 75 255 75 Q 235 75 230 145 Z'
                fill='url(#aortaGrad)'
                stroke='#ec4899'
                strokeWidth='2'
                filter='url(#heartBloom)'
              />
            </g>

            {/* 4. Left and Right Atria */}
            <path
              d='M 145 145 Q 130 180 160 215 Q 185 200 195 170 Q 185 140 145 145 Z'
              fill='#1e293b'
              stroke='#00d2ff'
              strokeWidth='1.5'
              strokeDasharray='3 3'
              opacity='0.7'
            />
            <path
              d='M 305 160 Q 345 190 330 230 Q 300 225 285 200 Q 295 170 305 160 Z'
              fill='#1e293b'
              stroke='#a855f7'
              strokeWidth='1.5'
              strokeDasharray='3 3'
              opacity='0.7'
            />

            {/* 5. Main Ventricular Muscle (Right & Left Ventricles) */}
            <g
              className='cursor-pointer'
              onMouseEnter={() => setActiveZone('Left & Right Ventricles')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <path
                d='M 160 195 
                   C 130 240, 150 310, 215 355 
                   C 240 372, 260 375, 275 355 
                   C 340 285, 360 220, 310 180 
                   C 285 160, 260 170, 240 175 
                   C 210 165, 180 170, 160 195 Z'
                fill='url(#myocardiumGrad)'
                stroke='#38bdf8'
                strokeWidth='2.5'
                filter='url(#heartBloom)'
              />

              {/* Internal depth overlay */}
              <path
                d='M 175 205 
                   C 150 245, 168 305, 222 342 
                   C 242 356, 258 356, 270 340 
                   C 325 278, 340 225, 298 190 
                   C 275 175, 255 185, 240 188 
                   C 215 180, 192 184, 175 205 Z'
                fill='url(#ventricleDepth)'
              />

              {/* Interventricular sulcus (groove between ventricles) */}
              <path
                d='M 242 185 Q 235 260 258 355'
                fill='none'
                stroke='rgba(168, 85, 247, 0.4)'
                strokeWidth='3'
                strokeDasharray='4 2'
              />
            </g>

            {/* 6. Glowing Coronary Arteries (LAD, Circumflex, RCA) */}
            <g filter='url(#arteryGlow)' className='cursor-pointer' onMouseEnter={() => setActiveZone('Coronary Arteries (LAD & RCA)')} onMouseLeave={() => setActiveZone(null)}>
              {/* Left Anterior Descending (LAD) Artery & branches */}
              <path
                d='M 245 185 
                   C 240 225, 248 270, 260 345'
                fill='none'
                stroke='url(#coronaryGlow)'
                strokeWidth='3.2'
                strokeLinecap='round'
              />
              {/* Diagonal LAD branches */}
              <path
                d='M 244 230 Q 275 245 295 270'
                fill='none'
                stroke='#00d2ff'
                strokeWidth='2'
                strokeLinecap='round'
                opacity='0.9'
              />
              <path
                d='M 248 260 Q 280 280 290 305'
                fill='none'
                stroke='#00d2ff'
                strokeWidth='1.8'
                strokeLinecap='round'
                opacity='0.8'
              />
              <path
                d='M 252 295 Q 270 310 275 328'
                fill='none'
                stroke='#00d2ff'
                strokeWidth='1.6'
                strokeLinecap='round'
                opacity='0.75'
              />

              {/* Right Coronary Artery (RCA) & marginal branch */}
              <path
                d='M 205 185 
                   C 180 215, 175 260, 205 320'
                fill='none'
                stroke='url(#aortaGrad)'
                strokeWidth='2.6'
                strokeLinecap='round'
              />
              <path
                d='M 186 230 Q 165 250 170 280'
                fill='none'
                stroke='#f43f5e'
                strokeWidth='1.8'
                strokeLinecap='round'
                opacity='0.85'
              />

              {/* Pulsing coronary perfusion nodes */}
              <motion.circle
                cx='245'
                cy='190'
                r='4'
                fill='#00e5ff'
                animate={prefersReducedMotion ? {} : { r: [3.5, 5.5, 3.5], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <motion.circle
                cx='248'
                cy='260'
                r='3.5'
                fill='#38bdf8'
                animate={prefersReducedMotion ? {} : { r: [3, 4.8, 3], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.15 }}
              />
              <motion.circle
                cx='260'
                cy='345'
                r='3.5'
                fill='#f43f5e'
                animate={prefersReducedMotion ? {} : { r: [3, 5, 3], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
              />
            </g>

            {/* Anatomical labels with soft lines */}
            <g className='text-[10px] font-mono select-none hidden sm:block'>
              {/* Aorta label */}
              <text x='345' y='82' fill='#d946ef' fontWeight='600'>Aortic Arch</text>
              <line x1='338' y1='82' x2='300' y2='88' stroke='#d946ef' strokeWidth='1' strokeDasharray='2 2' />

              {/* Pulmonary trunk label */}
              <text x='80' y='90' fill='#00d2ff' fontWeight='600'>Pulmonary Trunk</text>
              <line x1='165' y1='90' x2='225' y2='110' stroke='#00d2ff' strokeWidth='1' strokeDasharray='2 2' />

              {/* Left Ventricle label */}
              <text x='335' y='280' fill='#94a3b8' fontWeight='500'>Left Ventricle</text>
              <line x1='330' y1='278' x2='290' y2='270' stroke='#64748b' strokeWidth='1' strokeDasharray='2 2' />

              {/* LAD Coronary label */}
              <text x='65' y='275' fill='#38bdf8' fontWeight='600'>LAD Coronary</text>
              <line x1='138' y1='272' x2='240' y2='255' stroke='#38bdf8' strokeWidth='1' strokeDasharray='2 2' />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Active anatomical zone pill */}
      <div className='h-6 flex items-center justify-center mb-3'>
        <span className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-navy-950/80 border border-slate-700 text-slate-300'>
          <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse' />
          <span>{activeZone ? `Focus: ${activeZone}` : 'Hover anatomical regions to inspect vascular landmarks'}</span>
        </span>
      </div>

      {/* Integrated Continuous ECG Waveform Line */}
      <div className='relative pt-3 border-t border-slate-800/80'>
        <div className='flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5'>
          <div className='flex items-center gap-1.5'>
            <Activity className='w-3.5 h-3.5 text-cyan-400' />
            <span className='text-slate-300 font-semibold'>Lead II Rhythm Telemetry</span>
          </div>
          <div className='flex items-center gap-3'>
            <span>ST: <span className='text-emerald-400 font-semibold'>Isoelectric</span></span>
            <span>PR: <span className='text-slate-200'>152ms</span></span>
            <span>QTc: <span className='text-slate-200'>410ms</span></span>
          </div>
        </div>

        <div className='relative w-full h-16 bg-navy-950/90 rounded-xl border border-slate-800 overflow-hidden flex items-center px-2'>
          <div className='absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none' />

          <svg
            viewBox='0 0 760 90'
            className='w-full h-full overflow-visible'
            preserveAspectRatio='none'
            role='img'
            aria-label='Continuous real-time physiological ECG rhythm wave'
          >
            <defs>
              <linearGradient id='homeEcgGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#00d2ff' stopOpacity='0.3' />
                <stop offset='45%' stopColor='#00d2ff' stopOpacity='1' />
                <stop offset='65%' stopColor='#a855f7' stopOpacity='1' />
                <stop offset='100%' stopColor='#00d2ff' stopOpacity='0.2' />
              </linearGradient>
            </defs>

            {/* Zero isoelectric baseline */}
            <line x1='0' y1='45' x2='760' y2='45' stroke='rgba(255,255,255,0.06)' strokeDasharray='3 3' strokeWidth='1' />

            {/* Background trace */}
            <path
              d={ecgPath}
              fill='none'
              stroke='rgba(0, 210, 255, 0.2)'
              strokeWidth='1.8'
              strokeLinecap='round'
            />

            {/* Traveling glowing pulse wave */}
            <motion.path
              d={ecgPath}
              fill='none'
              stroke='url(#homeEcgGrad)'
              strokeWidth='2.8'
              strokeLinecap='round'
              strokeLinejoin='round'
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0.22, pathOffset: 0 }}
              animate={prefersReducedMotion ? { pathLength: 1 } : {
                pathOffset: [0, 1],
                pathLength: [0.22, 0.32, 0.22],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.3,
                ease: 'linear',
              }}
            />
          </svg>

          {/* Traveling neon scan line */}
          {!prefersReducedMotion && (
            <motion.div
              className='absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-cyan-400/10 to-cyan-400/35 border-r border-cyan-300 pointer-events-none'
              animate={{ left: ['-10%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2.3, ease: 'linear' }}
            />
          )}
        </div>
      </div>

      {/* Model integrity badges */}
      <div className='mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400'>
        <div className='flex items-center gap-1.5'>
          <ShieldCheck className='w-3.5 h-3.5 text-emerald-400' />
          <span>Support Vector Classifier (SVC)</span>
        </div>
        <div className='text-cyan-400 font-semibold'>
          ROC-AUC 0.961
        </div>
      </div>
    </div>
  );
};

export default AnatomicalHeart;
