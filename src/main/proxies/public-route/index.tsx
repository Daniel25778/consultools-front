import { useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { setIsRedirect } from 'store/persist/slice';

export const PublicRoute: FC = () => {
  const { isRedirect } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsRedirect = (): void => {
      if (isRedirect) dispatch(setIsRedirect(false));
    };

    checkIsRedirect();
  }, [dispatch, isRedirect]);

  return <Outlet />;
};
