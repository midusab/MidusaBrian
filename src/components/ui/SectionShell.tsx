import React from 'react';
import { ThemeMode } from '../../types/portfolio';
import { GrainOverlay } from '../GrainOverlay';

interface SectionShellProps {
  id: string;
  labelledBy: string;
  theme: ThemeMode;
  surface?: 'primary' | 'secondary';
  className?: string;
  sectionRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export const SectionShell: React.FC<SectionShellProps> = ({
  id,
  labelledBy,
  theme,
  surface = 'primary',
  className = '',
  sectionRef,
  children,
}) => {
  const isDark = theme === 'dark';

  const surfaceClasses = isDark
    ? surface === 'primary'
      ? 'bg-[#0B0D10] text-[#F5F5F5] border-white/[0.06]'
      : 'bg-[#0E1217] text-[#F5F5F5] border-white/[0.06]'
    : surface === 'primary'
    ? 'bg-white text-[#0B0D10] border-black/[0.06]'
    : 'bg-[#F8FAFC] text-[#0B0D10] border-black/[0.06]';

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-16 py-16 sm:py-24 lg:py-32 xl:py-36 px-4 sm:px-8 md:px-12 lg:px-16 border-t overflow-hidden transition-colors duration-300 ${surfaceClasses} ${className}`}
    >
      {isDark && <GrainOverlay />}
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
};
