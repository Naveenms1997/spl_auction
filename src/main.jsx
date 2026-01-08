import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AppShell from './App';
import AdminPage from './pages/AdminPage';
import SecondPage from './pages/SecondPage';
// import { AppProvider } from './context/AppContext';
import { GlobalProvider } from './context/GlobalContext';
import './index.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<AdminPage />} />
            <Route path="second" element={<SecondPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalProvider>
     </ThemeProvider>
  </React.StrictMode>
);
