import { Children, type FC, type ReactNode } from 'react';

interface SlidingContainerProps {
  children: ReactNode;
  className?: string;
  height: number;
  speed?: number;
  reverse?: boolean;
}

export const SlidingContainer: FC<SlidingContainerProps> = ({
  children,
  className,
  height,
  speed = 30,
  reverse
}) => {
  return (
    <div className={'relative overflow-hidden w-full'} style={{ height }}>
      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(-5%);
            }
            100% {
              transform: translateX(-55.2%);
            }
          }

          @keyframes slide2 {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0.2%);
            }
          }
        `}
      </style>

      <div
        className={`flex absolute w-max h-full ${className}`}
        style={{
          animation: `${reverse ? 'slide2' : 'slide'} linear infinite`,
          animationDuration: `${speed}s`
        }}
      >
        {Children.map(children, (child, index) => (
          <div key={`child-1-${index}`} className={`flex items-center ${className}`}>
            {child}
          </div>
        ))}

        {Children.map(children, (child, index) => (
          <div key={`child-2-${index}`} className={`flex items-center ${className}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
