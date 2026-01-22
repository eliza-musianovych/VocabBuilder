import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes () {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) return <Navigate to='/login' replace />;

    return <Outlet />
}