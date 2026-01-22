import { useAuth } from "../../auth/useAuth"
import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";

type HeaderProps = {
    onMenuOpen: () => void;
};

export default function Header ({ onMenuOpen }: HeaderProps) {
    const { user } = useAuth();

    if (!user) return <PublicHeader /> 

    return <PrivateHeader onMenuOpen={onMenuOpen}/>
}