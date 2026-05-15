import { useNavigate, useNavigationType } from 'react-router-dom';

interface useBackReturnProps {
  navigate: (path: string) => void;
}

export const useBack = (): useBackReturnProps => {
  const navigate1 = useNavigate();
  const navigationType = useNavigationType() as unknown as string;

  return {
    navigate(path: string): void {
      if (navigationType === 'POP') navigate1(path);
      else navigate1(-1);
    }
  };
};
