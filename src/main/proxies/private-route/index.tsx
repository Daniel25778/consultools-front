import { paths } from 'main/config';
import { useTokenIsExpired } from 'main/utils/token';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { logout } from 'store/persist/slice';

export const PrivateRoute: FC = () => {
  const isExpired = useTokenIsExpired();

  const { accessToken, user, isRedirect } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = (): void => {
      if (isExpired || accessToken === null || user === null) {
        if (!isRedirect) {
          dispatch(logout(location.pathname));
        }
        navigate(paths.login);
      }
    };

    checkToken();
  }, [isExpired, accessToken, location, user, dispatch, navigate, isRedirect]);

  if (isExpired || !user) return null;

  return <Outlet />;
};
