import { roleRoutes } from 'domain/enums';
import { paths } from 'main/config';
import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const HomeRoute: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(paths.login);
    else navigate(roleRoutes[user.role]?.replace('redirect', user.companyId));
  }, [user, navigate]);

  return <LoadingPage hasShadow />;
};
