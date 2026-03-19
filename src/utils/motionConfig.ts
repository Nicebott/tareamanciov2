export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const getReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile();
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const getAnimationProps = (reducedMotion = getReducedMotion()) => {
  if (reducedMotion) {
    return {
      initial: false,
      animate: { opacity: 1 },
      transition: { duration: 0 }
    };
  }
  return {
    initial: 'hidden',
    animate: 'visible',
    transition: { duration: 0.3 }
  };
};
