import { Logout, Person } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Role, roleRoutes, roleTranslate } from 'domain/enums/role';
import { Logo } from 'main/assets';
import { QueryName, apiPaths, paths } from 'main/config';
import { SearchInput } from 'presentation/atomic-component/molecule/search-input';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { logout, setRedirectPath } from 'store/persist/slice';
import { setSidebar } from 'store/sidebar/slice';

export const PrivateHeader: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }
  }[user.role];

  return (
    <header
      className={
        'flex flex-row justify-between items-center z-[1200] top-0 header sticky tablet:flex  h-auto laptop: w-full'
      }
    >
      <div className={'flex flex-col w-full'}>
        <div
          className={
            'text-white w-full  bg-primary dark:text-white flex items-center justify-end gap-5 py-1 px-4 tablet:px-[150px]  tablet:items-center tablet:justify-end '
          }
        >
          <div className={'flex gap-2 justify-center items-center'}>
            <Person color={'inherit'} fontSize={'small'} />
            <p className={'font-medium dark:font-bold'}>
              {' '}
              {roleTranslate[user.role]} - {user.name}{' '}
            </p>
          </div>

          <IconButton
            className={'gap-3'}
            onClick={(): void => {
              dispatch(logout());
              dispatch(setRedirectPath(null));
              dispatch(setSidebar(false));
            }}
            color={'inherit'}
          >
            <Logout color={'inherit'} fontSize={'small'} />
            <p className={'font-medium text-lg'}>Sair</p>
          </IconButton>
        </div>
        <div
          style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
          className={
            'w-full h-full bg-white flex flex-col justify-between items-start p-8 px-4 tablet:flex-row tablet:px-[150px] tablet:items-center gap-6'
          }
        >
          <img
            onClick={() => navigate(roleRoutes[user.role])}
            alt={'Logo'}
            className={'h-6 tablet:h-5 cursor-pointer'}
            src={Logo}
          />
          <SearchInput
            path={searchConfig.path}
            route={searchConfig.route}
            queryName={searchConfig.queryName}
            placeholder={searchConfig.placeholder}
          />
        </div>
      </div>
    </header>
  );
};
