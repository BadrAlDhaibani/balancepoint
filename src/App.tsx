import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { Global } from './utils/global';
import { theme } from './utils/theme';
import { Header } from './components/common/header';
import { Sidebar } from './components/common/sidebar';
import Dashboard from './components/dashboard/Dashboard';
import { Income } from './components/income';
import { Expense } from './components/expenses';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global />
        <Router>
          <Header onAddClick={() => console.log('Add button clicked')} />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/transactions" element={<div>Transactions Page - Coming Soon</div>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;