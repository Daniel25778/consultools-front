import { East } from '@mui/icons-material';
import { type FC, type ReactNode } from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const MenuCard: FC<MenuCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={
        'flex flex-col gap-4 w-full tablet:max-w-[300px] bg-white rounded px-6 pt-8 pb-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group'
      }
    >
      <div className={'flex flex-col gap-3'}>
        <div className={'flex items-center gap-2 bg-blue-50 w-max p-4 rounded-lg'}>{icon}</div>
        <h2 className={'text-xl font-semibold text-primary'}>{title}</h2>
      </div>
      <p className={'text-gray-400 text-base font-medium'}>{description}</p>
      <div className={'text-primary font-medium flex items-end justify-end gap-1'}>
        <East className={'text-primary transition-transform group-hover:translate-x-1'} />
      </div>
    </div>
  );
};
