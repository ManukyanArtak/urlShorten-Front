
import http from './HttpService';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    refreshToken: string;
    accessToken: string;
}


export const login = async (
    credentials: LoginCredentials,
): Promise<AuthResponse> => {
    const response = await http.post<AuthResponse>('/auth/login', credentials);
    const { accessToken } = response.data;

    if (accessToken) {
        localStorage.setItem('token', accessToken);
    }

    return response.data;
};

export const register = async (
    credentials: RegisterCredentials,
): Promise<void> => {
    await http.post('/auth/register', credentials);
};
