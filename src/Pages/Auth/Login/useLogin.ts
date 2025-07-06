import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../components/Context/AuthContext';
import { login as loginService, LoginCredentials } from '../../../services/AuthService';

const loginSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

interface LoginFormData {
    email: string;
    password: string;
}

interface ValidationErrors {
    email?: string;
    password?: string;
}

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (formData: LoginFormData) => {
        try {
            setIsLoading(true);
            setErrors({});

            await loginSchema.validate(formData, { abortEarly: false });

            const response = await loginService(formData as LoginCredentials);

            if (response.accessToken) {
                authLogin(response.accessToken);
            }

            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (error: unknown) {
            if (error instanceof yup.ValidationError) {
                const validationErrors: ValidationErrors = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        validationErrors[err.path as keyof ValidationErrors] = err.message;
                    }
                });
                setErrors(validationErrors);
            } else {
                console.error('Login error:', error);
                setErrors({
                    email: 'Invalid email or password',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData);
    };

    return {
        formData,
        showPassword,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        togglePasswordVisibility,
    };
};
