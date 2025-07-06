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


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

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
