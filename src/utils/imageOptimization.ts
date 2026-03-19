// Image optimization utilities
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const lazyLoadImage = (img: HTMLImageElement) => {
  const src = img.dataset.src;
  if (!src) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = image.dataset.src || '';
          image.classList.add('loaded');
          obs.unobserve(image);
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );

  observer.observe(img);
};

export const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach((img) => lazyLoadImage(img as HTMLImageElement));
};
