import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
} from '@mui/material';
import { Home, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Container component="main" maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: 3,
                    }}
                >
                    {/* 404 Number */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '8rem',
                            fontWeight: 'bold',
                            color: 'primary.main',
                            lineHeight: 1,
                            mb: 2,
                        }}
                    >
                        404
                    </Typography>

                    {/* Search Icon */}
                    <Search
                        sx={{
                            fontSize: '4rem',
                            color: 'text.secondary',
                            mb: 3,
                            opacity: 0.7,
                        }}
                    />

                    {/* Main Message */}
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                        }}
                    >
                        Page Not Found
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            maxWidth: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        The page you're looking for doesn't exist or has been moved. 
                        Let's get you back on track.
                    </Typography>

                    {/* Action Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Home />}
                            onClick={handleGoHome}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Go Home
                        </Button>
                        
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default NotFound; 