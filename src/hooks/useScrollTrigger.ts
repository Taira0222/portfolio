import { useEffect, useState } from 'react';

type UseScrollTriggerOptions = {
  threshold?: number;
};

export const useScrollTrigger = ({ threshold = 200 }: UseScrollTriggerOptions = {}) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setTriggered(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return triggered;
};
