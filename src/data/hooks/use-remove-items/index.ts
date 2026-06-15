import { Role } from 'domain/enums';
import { useUserLogged } from 'store/persist/selector';

interface useRemoveItemsProps {
  removeItems: string[];
}

export const useRemoveItems = (): useRemoveItemsProps => {
  const { role } = useUserLogged();

  if (role === Role.MANAGER) return { removeItems: ['empresas'] };

  return { removeItems: [] };
};
