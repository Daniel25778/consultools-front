import { usePath } from 'data/hooks';
import { roleRoutes } from 'domain/enums';
import { Logo } from 'main/assets';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Logout } from 'presentation/atomic-component/molecule';
import { type FC, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSidebar, useUserLogged } from 'store/persist/selector';

export const LaptopSidebar: FC = () => {
  const containerRef = useRef(null);
  const { open } = useSidebar();
  const { allPathname, lastPathname } = usePath();

  const { role, companyId: userCompanyId } = useUserLogged();
  const { companyId: paramCompanyId } = useParams<{ companyId: string }>();

  const companyId = paramCompanyId || userCompanyId;

  return (
    <div
      className={`flex sidebar flex-col top-0 fixed gap-3 z-[999] h-dvh border-r bg-white dark:bg-gray-800 dark:border-gray-600 border-gray-200 transition-[width] ease-in-out ${
        open ? 'w-[270px]' : 'w-[80px]'
      }`}
      ref={containerRef}
    >
      <div
        className={
          'flex p-4 w-full gap-4 justify-between items-center border-b border-gray-200 dark:border-gray-600 min-h-[70px] max-h-[70px]'
        }
      >
        <Link
          className={open ? '' : 'hidden'}
          to={roleRoutes[role]?.replace('redirect', companyId)}
        >
          <img alt={'Logo'} className={'h-[20px] cursor-pointer'} src={Logo} />
        </Link>

        <ToggleMenu />
      </div>

      <div className={'flex flex-col gap-3 h-full overflow-auto'}>
        {sidebarItems({ companyId: companyId, role }).map(({ icon, link, name, onClick }) => {
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
              onClick={onClick}
              title={name}
            />
          );
        })}
      </div>

      <span className={'border-t border-gray-200 dark:border-gray-600 py-[7px]'}>
        <Logout />
      </span>
    </div>
  );
};
