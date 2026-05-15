import type { FC, ReactNode } from 'react';

interface GenericCardProps {
  title?: ReactNode | string;
  text?: ReactNode | string;
  icon: ReactNode;
  endElement?: ReactNode;
  bottomElement?: ReactNode;
}

export const GenericCard: FC<GenericCardProps> = ({
  title,
  icon,
  bottomElement,
  endElement,
  text,
}) => {
  return (
    <div
      className={
        'flex flex-col gap-3 border border-input-border-2 rounded p-4 w-full'
      }
    >
      <div className={'flex flex-wrap items-center justify-between gap-4'}>
        <div className={'flex items-center justify-between gap-2'}>
          <span
            className={
              'bg-gray-150 flex justify-center items-center min-w-[43px] h-[43px] rounded-full'
            }
          >
            {icon}
          </span>

          <div>
            <h3 className={'text-sm'}>{title}</h3>
            <p className={'font-medium break-words'}>{text}</p>
          </div>
        </div>

        {endElement}
      </div>

      {bottomElement}
    </div>
  );
};
