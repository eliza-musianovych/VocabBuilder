import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Navigate } from "react-router-dom";

export default function PublicRoutes () {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) return <Navigate to='/dictionary' replace />;

    return <Outlet />
}