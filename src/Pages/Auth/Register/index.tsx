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
import {useRegistration} from './useRegistration';

const Index = () => {
    const {
        formData,
        showPassword,
        showConfirmPassword,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    } = useRegistration();
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
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            Join us and start creating your short URLs
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                            {/* Error Alert */}
                            {(errors.name || errors.email || errors.password || errors.confirmPassword) && (
                                <Alert severity="error" sx={{mb: 2}}>
                                    {errors.name || errors.email || errors.password || errors.confirmPassword}
                                </Alert>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                autoComplete="name"
                                autoFocus
                                error={!!errors.name}
                                helperText={errors.name}
                                sx={{mb: 2}}
                            />

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
                                autoComplete="new-password"
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
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb: 2}}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                autoComplete="new-password"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={toggleConfirmPasswordVisibility}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
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
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Button
                                        variant="text"
                                        // onClick={onSwitchToLogin}
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
                                        Sign in here
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
