import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "../services/authServices";
import { type User } from "../types/userTypes";

export function AuthProvider({ children }: {children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}