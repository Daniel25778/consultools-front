import { GoBack } from 'presentation/atomic-component/atom/go-back';
import type { FC, ReactNode } from 'react';

interface MenuItemProps {
  children?: ReactNode;
  endElement?: ReactNode;
  className?: string;
  showGoBack?: boolean;
  title?: string;
}

export const MainDiv: FC<MenuItemProps> = ({
  children,
  showGoBack,
  className,
  endElement,
  title,
}) => (
  <div className={`flex flex-col gap-4 tablet:gap-6 ${className}`}>
    {title ? (
      <div className={'flex flex-col items-start gap-5'}>
        {showGoBack ? <GoBack /> : null}

        <div className={'flex justify-between w-full items-center h-10'}>
          <h2 className={'text-primary text-2xl font-semibold'}>{title}</h2>
          {endElement}
        </div>
      </div>
    ) : null}

    {children}
  </div>
);
