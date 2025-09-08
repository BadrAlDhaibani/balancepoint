import { ThemeProvider } from 'styled-components';
import { Global } from './utils/global';
import { theme } from './utils/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global />
    </ThemeProvider>
  );
};

export default App;