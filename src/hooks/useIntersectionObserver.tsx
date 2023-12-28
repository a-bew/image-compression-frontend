import { useEffect, useRef } from 'react';

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

const useIntersectionObserver = (onIntersect: IntersectionObserverCallback) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(onIntersect, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [onIntersect]);

  return elementRef;
};

export default useIntersectionObserver;