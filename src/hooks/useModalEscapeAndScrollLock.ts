import { useEffect } from 'react';

interface UseModalOptions {
  onClose: () => void;
  onKeyDownExtra?: (event: KeyboardEvent) => void;
}

export function useModalEscapeAndScrollLock({ onClose, onKeyDownExtra }: UseModalOptions) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      onKeyDownExtra?.(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onKeyDownExtra]);
}
