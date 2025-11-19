import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AppShell from './App';
import MainPage from './pages/MainPage';
import SecondPage from './pages/SecondPage';
// import { AppProvider } from './context/AppContext';
import { GlobalProvider } from './context/GlobalContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<MainPage />} />
            <Route path="second" element={<SecondPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalProvider>
  </React.StrictMode>
);
