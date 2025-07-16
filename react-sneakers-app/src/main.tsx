import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
