import { Tooltip } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import { Link, type To } from 'react-router-dom';
import { useSidebar } from 'store/sidebar/selector';
import { IconRender } from '../icon-render';

interface SidebarItemProps {
  title: string;
  iconName: ReactNode | string;
  onClick?: () => Promise<void> | void;
  link?: To;
  isMobile?: boolean;
  size?: 'large' | 'small';
  active?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  iconName,
  link,
  title,
  isMobile,
  active,
  size = 'small',
  onClick
}) => {
  const { open, setOpen } = useSidebar();

  const getElement = (): ReactNode => {
    return (
      <div
        className={`flex w-full tablet:rounded p-1 tablet:p-0 cursor-pointer text-gray-700 dark:text-white hover:bg-primary/20 hover:text-primary 
          ${active ? 'text-primary bg-primary/20' : ''}
          `}
        onClick={async (): Promise<void> => {
          if (onClick) await onClick();
          if (isMobile) setOpen(false);
        }}
      >
        <div
          className={
            'flex w-full px-[12px] items-center h-[42px] gap-3 transition-[width] ease-in delay-75'
          }
        >
          <span className={'relative'}>
            {typeof iconName === 'string' ? (
              <IconRender name={iconName} sx={{ fontSize: '1.5rem' }} />
            ) : (
              iconName
            )}
          </span>

          <span
            className={`h-[1.5rem] font-semibold transition-[width,margin] duration-100 ease-in-out overflow-hidden truncate cursor-pointer ${
              open ? 'w-[207px]' : 'w-[0px]'
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    );
  };
  const wrappedContent = open ? (
    getElement()
  ) : (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: colors.gray[125],
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '4px',
            color: colors.black,
            fontSize: 16,
            padding: '6px 16px'
          }
        }
      }}
      placement={'right'}
      title={title}
    >
      <div>{getElement()}</div>
    </Tooltip>
  );

  const gap = size === 'small' ? 'tablet:px-4' : 'py-2 tablet:px-4 tablet:py-3';

  if (link)
    return (
      <Link className={`w-full ${gap}`} to={link}>
        {wrappedContent}
      </Link>
    );

  return <div className={`w-full ${gap}`}>{wrappedContent}</div>;
};
