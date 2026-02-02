import css from './Sidebar.module.css';
import clsx from 'clsx';
import UserBar from '../UserBar/UserBar';
import UserNav from '../UserNav/UserNav';
import { useEffect } from 'react';
import { logout } from '../../services/authServices';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    isOpen: boolean; 
    onClose: () => void;
}

export default function Sidebar ({ isOpen, onClose }: SidebarProps) { 
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, [isOpen, onClose]);

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
            localStorage.removeItem('token');
            onClose();
            navigate('/login');
        }
    };

    return ( 
    <>
        {isOpen && (<div className={css.overlay} onClick={onClose} />)}
        <aside
        className={
            clsx(
                css.sidebar,
                isOpen && css.open
            )}
        >
            <div className={css.container}>
                <UserBar type='menu' />
                <button
                type='button'
                className={css.closeBtn}
                onClick={onClose}
                >
                <svg
                className={css.closeBtn}
                >
                    <use href='/sprite.svg#icon-x' />
                </svg>
                </button>
            </div>
            <div>
                <UserNav type='menu' />
                <button
                type='button'
                className={css.logoutBtn}
                onClick={handleLogout}
                > 
                    <p className={css.logout}>Log out</p>
                    <svg width={16} height={16} >
                        <use href='/sprite.svg#icon-arrow-right' />
                    </svg>
                </button>
            </div>
            <img
            className={css.img}
            src="/img/illustration.png"
            srcSet="/img/illustration.png 1x, /img/illustrationx2.png 2x"
            alt="illustration"
            />
        </aside>
    </> 
    ) 
}