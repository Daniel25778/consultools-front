import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';

interface ScrollAnimationProps {
  direction: 'down' | 'left' | 'right' | 'up';
  children: ReactNode;
  className?: string;
}

export const ScrollAnimation: FC<ScrollAnimationProps> = ({ direction, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const directionClasses = {
    down: 'translate-y-[150px]',
    left: 'translate-x-[-150px]',
    right: 'translate-x-[150px]',
    up: 'translate-y-[-150px]'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-out opacity-0 ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : directionClasses[direction]
      } ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
