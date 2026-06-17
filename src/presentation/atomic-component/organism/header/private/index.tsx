import { Role } from 'domain/enums';
import { apiPaths, paths, QueryName } from 'main/config';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { SearchInput } from 'presentation/atomic-component/molecule';
import type { FC } from 'react';
import { useAppSelector } from 'store/index';

export const PrivateHeader: FC = () => {
  const { user, sidebarOpen } = useAppSelector((state) => state.persist);

  const searchConfig = {
    [Role.ADMIN]: {
      queryName: QueryName.user,
      route: apiPaths.user,
      path: paths.consultant,
      placeholder: 'Buscar consultores...'
    },
    [Role.CONSULTANT]: {
      queryName: QueryName.company,
      route: apiPaths.company,
      path: paths.company,
      placeholder: 'Buscar empresas...'
    },
    [Role.COLLABORATOR]: {
      queryName: QueryName.productionReport,
      route: apiPaths.productionReport,
      path: paths.productionReport,
      placeholder: 'Buscar apontamentos...'
    },
    [Role.MANAGER]: {
      queryName: QueryName.productionReport,
      route: apiPaths.productionReport,
      path: paths.productionReport,
      placeholder: 'Buscar apontamentos...'
    }
  }[user.role];

  return (
    <header
      className={
        'flex justify-between items-center p-4 bg-white laptop:p-8 border-b z-[999]  border-gray-200 dark:bg-gray-800 dark:border-gray-600 sticky top-0 h-[70px] header'
      }
    >
      <div
        className={`hidden laptop:flex ${sidebarOpen ? 'ml-[270px]' : 'ml-[80px]'} ease-in-out transition-all duration-200`}
      >
        {/* <Link to={roleRoutes[user.role]?.replace('redirect', user?.companyId)}>
          <img alt={'Logo'} className={'h-[20px] cursor-pointer'} src={Logo} />
        </Link> */}
        <p
          className={
            'hidden text-xl tablet:flex text-primary dark:text-white font-semibold dark:font-bold truncate max-w-[50dvw]'
          }
        >
          Olá, {user.name}
        </p>
      </div>

      <div className={'flex gap-3 laptop:hidden'}>
        <ToggleMenu />
      </div>

      <div className={'flex items-center gap-3 tablet:gap-6'}>
        <SearchInput
          path={searchConfig.path}
          route={searchConfig.route}
          queryName={searchConfig.queryName}
          placeholder={searchConfig.placeholder}
        />
      </div>
    </header>
  );
};
