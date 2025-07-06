import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { register as registerService, RegisterCredentials } from '../../../services/AuthService';

const registrationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

interface RegistrationFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const useRegistration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

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

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const register = async (formData: RegistrationFormData) => {
        try {
            setIsLoading(true);
            setErrors({});

            await registrationSchema.validate(formData, { abortEarly: false });

            const registrationData: RegisterCredentials = {
                email: formData.email,
                password: formData.password,
            };

            await registerService(registrationData);

            navigate('/login');
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
                console.error('Registration error:', error);
                setErrors({
                    email: 'Registration failed. Please try again.',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(formData);
    };

    return {
        formData,
        showPassword,
        showConfirmPassword,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    };
};
