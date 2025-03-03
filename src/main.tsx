import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ThemeProvider } from './components/theme-provider.tsx';
import ReloadPrompt from './components/reload-prompt.tsx';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <ReloadPrompt />
      <App />
    </ThemeProvider>
  </StrictMode>
);
