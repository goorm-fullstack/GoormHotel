import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './Style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './Style/theme';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
		<Router>
    	<App />
		</Router>
  </ThemeProvider>
);

