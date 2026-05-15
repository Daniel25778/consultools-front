import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from 'store/index';

export interface JwtPayload {
  exp: number;
  iat: number;
  user: {
    email: string;
    id: number;
    name: string;
    role: string;
  };
}

const isExpired = (accessToken: string | null): boolean => {
  if (!accessToken || String(accessToken) === 'null') return true;
  try {
    const token = jwtDecode(accessToken ?? '') as JwtPayload | null;

    if (!token?.exp) return true;
    return !!(Date.now() >= token.exp * 1000);
  } catch {
    return true;
  }
};

export const useTokenIsExpired = (): boolean => {
  const { accessToken } = useAppSelector((state) => state.persist);

  return isExpired(accessToken);
};
