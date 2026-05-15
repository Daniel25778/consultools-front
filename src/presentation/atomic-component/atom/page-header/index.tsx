import type { FC, ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  endElement?: ReactNode;
}
export const PageHeader: FC<PageHeaderProps> = ({ title, endElement }) => {
  return (
    <div
      className={'flex flex-wrap gap-3 pt-2 items-center tablet:flex-row w-full justify-between'}
    >
      <div className={'flex flex-wrap tablet:w-auto'}>
        <h1 className={'uppercase text-3xl border-b-[3px] px-4 border-primary'}>
          <span>{title}</span>
        </h1>
      </div>

      <div>{endElement}</div>
    </div>
  );
};
