import App from 'main/App';
import { MaterialUIProvider } from 'presentation/style/provider/material-provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

const element = document.getElementById('root') as Element;
const root = createRoot(element);

root.render(
  <StrictMode>
    <Provider store={store}>
      <MaterialUIProvider>
        <App />
      </MaterialUIProvider>
    </Provider>
  </StrictMode>,
);
