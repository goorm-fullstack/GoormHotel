import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './Style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './Style/theme';
import AdminApp from './admin/AdminApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const isAdminPage = window.location.pathname.includes('/admin');

const AppToRender = isAdminPage ? <AdminApp /> : <App />;

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {AppToRender}
  </ThemeProvider>
);
