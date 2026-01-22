import { createContext } from "react";
import { type User } from "../types/userTypes";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);