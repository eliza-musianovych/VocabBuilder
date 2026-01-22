import css from './UserBar.module.css';
import { useAuth } from "../../auth/useAuth";
import clsx from 'clsx';

type UserBarProps = {
    type: 'header' | 'menu';
};

export default function UserBar ({ type }: UserBarProps) {
    const { user } = useAuth();
    const isHeader = type === 'header';

    return (
        <div className={css.container}>
        <p className={clsx(css.userName, !isHeader && css.userNameMenu)}>{user?.name}</p>
        <div className={clsx(css.userIcon, isHeader && css.userIconHeader)}>
            {isHeader ? 
            <svg 
            className={css.icon}
            width={14}
            height={14}
            >
                <use href='/sprite.svg#icon-user-header' />
            </svg> :
            <svg 
            className={css.icon}
            width={14}
            height={14}
            >
                <use href='/sprite.svg#icon-user' />
            </svg>
            }
        </div>
        </div>
    )
}