import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider.tsx';
import ReloadPrompt from './components/reload-prompt.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { Status } from './components/status.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ReloadPrompt />
        <Status />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
