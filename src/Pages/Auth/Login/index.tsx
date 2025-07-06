import { useLogin } from './useLogin';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';


const Index = () => {
    const {
        formData,
        showPassword,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        togglePasswordVisibility,
    } = useLogin();
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
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            borderRadius: 2,
                        }}
                    >
                        <Typography component="h1" variant="h4" gutterBottom>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            Sign in to your account to continue
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                            {/* Error Alert */}
                            {(errors.email || errors.password) && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {errors.email || errors.password}
                                </Alert>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                autoFocus
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={{mb: 2}}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb: 3}}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>

                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Button
                                        variant="text"
                                        // onClick={onSwitchToRegister}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                textDecoration: 'underline',
                                            }
                                        }}
                                    >
                                        Sign up here
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>

        </Box>
    );
};

export default Index;
