import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateLayout = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateLayout;
