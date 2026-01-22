import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "../services/authServices";
import { type User } from "../types/userTypes";
import { setToken } from "../utils/token";

export function AuthProvider({ children }: {children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }

        async function init() {
            try {
                const data = await getUser();
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        init();
    }, []);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}