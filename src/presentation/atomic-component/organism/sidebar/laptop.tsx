import { usePath } from 'data/hooks';
import { Logo } from 'main/assets';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Logout } from 'presentation/atomic-component/molecule';
import { type FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const LaptopSidebar: FC = () => {
  const containerRef = useRef(null);
  const { open } = useAppSelector((state) => state.sidebar);
  const { firstPathname } = usePath();

  return (
    <div
      className={`flex sidebar flex-col top-0 fixed gap-3 z-[9999] h-dvh border-r bg-white dark:bg-gray-800 dark:border-gray-600 border-gray-200 transition-[width] ease-in-out ${
        open ? 'w-[270px]' : 'w-[80px]'
      }`}
      ref={containerRef}
    >
      <div
        className={
          'flex p-4 w-full gap-4 justify-between border-b border-gray-200 dark:border-gray-600 min-h-[70px] max-h-[70px]'
        }
      >
        <Link className={open ? '' : 'hidden'} to={paths.home}>
          <img alt={'Logo'} className={' h-[40px]'} src={Logo} />
        </Link>

        <ToggleMenu />
      </div>

      <div className={'flex flex-col gap-3 h-full overflow-auto'}>
        {sidebarItems.map(({ icon, link, name, onClick }) => {
          let active = false;

          if (link?.startsWith(firstPathname)) active = true;

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

      <span className={'border-t border-gray-200 dark:border-gray-600'}>
        <Logout />
      </span>
    </div>
  );
};
