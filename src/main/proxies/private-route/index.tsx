import { paths } from 'main/config';
import { useTokenIsExpired } from 'main/utils/token';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { logout, setRedirectPath } from 'store/persist/slice';

export const PrivateRoute: FC = () => {
  const isExpired = useTokenIsExpired();

  const { accessToken, user } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = (): void => {
      if (isExpired || accessToken === null || user === null) {
        dispatch(setRedirectPath(location.pathname));
        dispatch(logout());
        navigate(paths.login);
      }
    };

    checkToken();
  }, [isExpired, accessToken, location, user, dispatch, navigate]);

  if (isExpired || !user) return null;

  return <Outlet />;
};
