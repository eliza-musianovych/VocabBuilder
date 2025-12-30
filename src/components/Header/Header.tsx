import { useAuth } from "../../auth/useAuth"
import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";

export default function Header () {
    const { user } = useAuth();

    if (!user) return <PublicHeader /> 

    return <PrivateHeader />
}