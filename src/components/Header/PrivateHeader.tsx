import css from './PrivateHeader.module.css'
import Logo from '../Logo/Logo';
import UserBar from '../UserBar/UserBar';
import UserNav from '../UserNav/UserNav';

type PrivateHeaderProps = {
    onMenuOpen: () => void;
};

export default function PrivateHeader ({ onMenuOpen }: PrivateHeaderProps) {
    return (
        <header className={css.header}>
            <Logo />
            <UserNav type='header' />
            <div className={css.container}>
                <UserBar type='header'/>
                <button 
                onClick={onMenuOpen}
                type='button'
                className={css.burgerBtn} 
                aria-label='Open menu'               
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    )
}