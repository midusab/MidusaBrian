import React, { useState } from 'react';
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
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
      {!loaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? 'bg-[#151A22]' : 'bg-slate-200/80'
          }`}
        />
      )}

      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        style={shouldReduceMotion ? undefined : motionStyle}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 1.025,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      />
    </div>
  );
};
