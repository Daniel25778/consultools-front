import 'presentation/style/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { useTheme, useWindowDimensions } from 'data/hooks';
import { queryClient } from 'infra/lib';
import { colors } from 'presentation/style';
import { useEffect, type FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { dimensions } from './config';
import Router from './routes';

const App: FC = () => {
  const { width } = useWindowDimensions();

  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementById('body');

    if (body) {
      const html = document.documentElement;
      html.setAttribute('data-mode', theme);
      body.setAttribute('data-mode', theme);
      if (theme === 'dark') {
        body.style.background = colors.gray[900];
        body.style.color = colors.white;
      } else {
        body.style.background = colors.white;
        body.style.color = colors.black;
      }
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />

      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        limit={4}
        pauseOnHover
        position={width >= dimensions.laptop ? 'bottom-right' : 'top-right'}
        style={{ padding: '12px' }}
        theme={theme}
      />
    </QueryClientProvider>
  );
};

export default App;
