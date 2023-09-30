import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/common/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './components/common/theme';
import AdminApp from './admin/AdminApp';
import axios from "axios";

// Global axios defaults
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

const isAdminPage = window.location.pathname.includes('/admin');

const AppToRender = isAdminPage ? <AdminApp /> : <App />;

root.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {AppToRender}
    </ThemeProvider>
);
