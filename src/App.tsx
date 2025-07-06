import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './components/Context/AuthContext';
import {PrivateRoute} from './components/RouteGuards/PrivateRoute';
import {PublicRoute} from './components/RouteGuards/PublicRoute';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound/NotFound';
import {theme as themeConfig} from './consts/theme';

const theme = createTheme(themeConfig);

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute>
                                <Login/>
                            </PublicRoute>
                        }/>
                        <Route path="/register" element={
                            <PublicRoute>
                                <Register/>
                            </PublicRoute>
                        }/>

                        <Route path="/" element={
                            <PrivateRoute>
                                <Dashboard/>
                            </PrivateRoute>
                        }/>

                        {/* 404 Route - Must be last */}
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
