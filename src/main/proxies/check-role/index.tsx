import { Role, roleRoutes } from 'domain/enums';
import { useEffect, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';

interface CheckRoleProps {
  roles: Role[];
}

export const CheckRole: FC<CheckRoleProps> = ({ roles }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.persist);

  useEffect(() => {
    if (!roles.includes(user?.role)) {
      navigate(roleRoutes[user.role]?.replace('redirect', user.companyId));
    }
  }, [user, navigate, roles]);

  return <Outlet />;
};
