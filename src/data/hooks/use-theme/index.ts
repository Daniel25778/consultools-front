import { useAppSelector } from 'store/index';

export const useTheme = (): 'dark' | 'light' => {
  const { theme } = useAppSelector((state) => state.persist);

  return theme;
};
