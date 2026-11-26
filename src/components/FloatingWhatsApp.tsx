import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ThemeMode } from '../types/portfolio';

interface FloatingWhatsAppProps {
  theme?: ThemeMode;
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  theme = 'dark',
  phoneNumber = '0112478220',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  // Format local 011... into international WhatsApp URL (+254...)
  const sanitizedNumber = phoneNumber.replace(/[^0-9]/g, '');
  const internationalNumber = sanitizedNumber.startsWith('0')
    ? `254${sanitizedNumber.slice(1)}`
    : sanitizedNumber;

  const whatsappUrl = `https://wa.me/${internationalNumber}?text=${encodeURIComponent(
    'Hi Midusa, I came across your developer portfolio and would like to connect!'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Midusa on WhatsApp (${phoneNumber})`}
        title={`Chat with Midusa on WhatsApp (${phoneNumber})`}
        initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className={`relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-lg transition-shadow duration-300 ${
          isDark
            ? 'shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.5)]'
            : 'shadow-[0_8px_28px_rgba(37,211,102,0.28)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.42)]'
        }`}
      >
        <svg
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.55 3.75 1.52 5.32L2 22l4.9-1.61c1.51.87 3.25 1.34 5.14 1.34 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 13.97c-.24.68-1.4 1.3-1.94 1.37-.5.07-1.14.1-3.32-.8-2.61-1.08-4.29-3.73-4.42-3.9-.13-.18-1.05-1.4-1.05-2.67 0-1.27.67-1.9 1-2.16.24-.22.53-.28.71-.28.18 0 .36 0 .52.01.17.01.4-.06.63.48.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1 1.79.84 2.1 1 .31.15.52.23.6.36.08.13.08.76-.16 1.44z" />
        </svg>

        {/* Subtle active status dot */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] border-2 border-white" />
        </span>
      </motion.a>
    </div>
  );
};
