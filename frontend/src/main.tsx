import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignupPage from './pages/Signuppage.tsx';
import LoginPage from './pages/Loginpage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
