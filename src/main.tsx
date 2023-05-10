import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import 'sanitize.css';

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mock/browser.ts');
  worker.start();
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Page not found.');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
