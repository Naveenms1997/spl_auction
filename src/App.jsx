import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Electron + Vite App</h2>
      <Outlet />
    </div>
  );
}
