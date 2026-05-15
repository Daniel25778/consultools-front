import type { FC, ReactNode } from 'react';

interface ErrorDivProps {
  text: ReactNode | string;
}

export const ErrorDiv: FC<ErrorDivProps> = ({ text }) => {
  return (
    <div
      className={
        'my-3 py-2 px-4 text-sm text-start rounded-sm bg-lightRed text-red'
      }
    >
      {text}
    </div>
  );
};
