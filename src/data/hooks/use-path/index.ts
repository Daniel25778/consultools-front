import { useLocation } from 'react-router-dom';

export const usePath = (): {
  allPathname: (string | undefined)[];
  firstPathname: string;
  lastPathname: string;
} => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const firstPathname = pathSegments.length > 0 ? `/${pathSegments[0]}` : '/';

  const lastPathname = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';

  const allPathname = pathSegments.map((segment) =>
    segment.replace(`?${queryParams.toString()}`, '').replace(/#.+/gu, '')
  );

  return { allPathname, firstPathname, lastPathname };
};
