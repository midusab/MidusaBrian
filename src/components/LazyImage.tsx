import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, MotionStyle } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
  isDark?: boolean;
  priority?: boolean;
  motionStyle?: MotionStyle;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackLabel,
  isDark = true,
  priority = false,
  motionStyle,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setFailed(false);
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  if (failed) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center p-8 text-sm ${
          isDark ? 'bg-[#12161E] text-[#9297A1]' : 'bg-slate-200 text-[#525866]'
        } ${containerClassName}`}
      >
        {fallbackLabel || alt}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Cinematic blur-up placeholder backdrop */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-br from-[#141922] via-[#0F131A] to-[#0B0D10]'
              : 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200'
          }`}
        />
        <div
          className="absolute -inset-6 blur-2xl opacity-70 animate-pulse"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 35% 40%, rgba(30, 144, 255, 0.16), transparent 60%), radial-gradient(circle at 75% 70%, rgba(255, 255, 255, 0.05), transparent 55%)'
              : 'radial-gradient(circle at 35% 40%, rgba(30, 144, 255, 0.14), transparent 60%), radial-gradient(circle at 75% 70%, rgba(15, 23, 42, 0.06), transparent 55%)',
          }}
        />
      </div>

      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        referrerPolicy="no-referrer"
        style={shouldReduceMotion ? undefined : motionStyle}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, scale: 1.06, filter: 'blur(20px)' }
        }
        animate={
          shouldReduceMotion
            ? { opacity: loaded ? 1 : 0 }
            : {
                opacity: loaded ? 1 : 0,
                scale: loaded ? 1 : 1.06,
                filter: loaded ? 'blur(0px)' : 'blur(20px)',
              }
        }
        transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        className={`will-change-[opacity,transform,filter] ${className}`}
      />
    </div>
  );
};
