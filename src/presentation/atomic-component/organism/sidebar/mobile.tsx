import { Slide } from '@mui/material';
import { usePath } from 'data/hooks';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Logout } from 'presentation/atomic-component/molecule';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSidebar, useUserLogged } from 'store/persist/selector';

export const MobileSidebar: FC = () => {
  const { open, setOpen } = useSidebar();
  const { allPathname, lastPathname } = usePath();

  const { role, companyId: userCompanyId } = useUserLogged();
  const { companyId: paramCompanyId } = useParams<{ companyId: string }>();

  const companyId = paramCompanyId || userCompanyId;

  return (
    <Slide direction={'right'} in={open} style={{ overflow: 'auto' }}>
      <div
        className={
          'flex flex-col justify-between fixed z-40 pt-4 laptop:pt-0 bg-white dark:bg-gray-800 w-full h-[calc(100dvh-70px)]'
        }
      >
        <div className={'flex flex-col gap-1 h-full overflow-auto'}>
          {sidebarItems({ role, companyId }).map(({ icon, link, name }) => {
            let active = false;

            if (link === paths.companyDetails(companyId)) {
              if (lastPathname === companyId) active = true;
            } else if (`/${allPathname?.join('/')}`.includes(link)) active = true;

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

        <span className={'border-t border-gray-200 py-2'}>
          <Logout />
        </span>
      </div>
    </Slide>
  );
};
