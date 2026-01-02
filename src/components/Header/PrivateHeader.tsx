import { useAuth } from '../../auth/useAuth'
import Logo from '../Logo/Logo';
import css from './PrivateHeader.module.css'

export default function PrivateHeader () {
    const { user } = useAuth();

    return (
        <header className={css.header}>
            <Logo />
            <div className={css.container}>
                <div className={css.userContainer}>
                    <p>{user?.name}</p>
                    <div className={css.userIcon}>
                        <svg 
                            className={css.icon}
                            width={20}
                            height={20}
                        >
                            <use href='/public/sprite.svg#icon-gridicons_user' />
                        </svg>
                    </div>
                </div>
                <button type='button'>
                    <svg 
                        className={css.icon}
                        width={32}
                        height={22}
                    >
                        <use href='/public/sprite.svg#icon-Nav' />
                    </svg>
                </button>
            </div>
        </header>
    )
}