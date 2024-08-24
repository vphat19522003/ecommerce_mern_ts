import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalCssPriority from './GlobalCssPriority';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalCssPriority>
      <App />
    </GlobalCssPriority>
  </StrictMode>
);
