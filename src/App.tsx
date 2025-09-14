import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { Global } from './utils/global';
import { theme } from './utils/theme';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const handleNavigateToTransactions = () => {
    console.log('Navigate to transactions page');
    //future: router.push('/transactions')
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global />
        <Dashboard 
          onNavigateToTransactions={handleNavigateToTransactions}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;