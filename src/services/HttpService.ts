
import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
} from 'axios';


class HttpService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use((config: any) => {
                const token = localStorage.getItem('token');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error),
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const status = error.response?.status;

                if (status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }

                return Promise.reject(error);
            },
        );
    }

    public get instance(): AxiosInstance {
        return this.axiosInstance;
    }
}

const http: AxiosInstance = new HttpService().instance;
export default http;
