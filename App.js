import React from 'react';
import AppNavigator from './navigations/Navigation';
import { ThemeProvider } from './navigations/ThemeProvider'; // import your navigator

const App = () => {
  return (
    <ThemeProvider>
    <AppNavigator />
    </ThemeProvider> // no need to wrap with DarkModeProvider anymore
  );
};

export default App;
