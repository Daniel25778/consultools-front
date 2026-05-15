import { Slide } from '@mui/material';
import { usePath } from 'data/hooks';
import { sidebarItems } from 'main/mock';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Logout } from 'presentation/atomic-component/molecule';
import type { FC } from 'react';
import { useSidebar } from 'store/sidebar/selector';

export const MobileSidebar: FC = () => {
  const { open, setOpen } = useSidebar();
  const { firstPathname } = usePath();

  return (
    <Slide direction={'right'} in={open} style={{ overflow: 'auto' }}>
      <div
        className={
          'flex flex-col justify-between fixed z-40 pt-4 laptop:pt-0 bg-white dark:bg-gray-800 w-full h-[calc(100dvh-70px)]'
        }
      >
        <div className={'flex flex-col gap-1 h-full overflow-auto'}>
          {sidebarItems.map(({ icon, link, name }) => {
            let active = false;

            if (link?.startsWith(firstPathname)) active = true;

            return (
              <SidebarItem
                key={name}
                active={active}
                iconName={icon}
                link={link}
                onClick={(): void => setOpen(false)}
                title={name}
              />
            );
          })}
        </div>

        <span className={'border-t border-gray-200'}>
          <Logout />
        </span>
      </div>
    </Slide>
  );
};
