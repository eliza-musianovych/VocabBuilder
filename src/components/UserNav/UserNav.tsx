import { clsx } from 'clsx';
import css from './UserNav.module.css';
import { NavLink } from 'react-router-dom';

type UserNavProps = {
    type: 'header' | 'menu';
};

export default function UserNav ({ type }: UserNavProps) {
    const isHeader = type === 'header';

    return (
        <nav className={css.nav}>
            <ul className={clsx(css.navList, isHeader && css.headerNav)}>
                <li>
                    <NavLink
                    to={'/dictionary'}
                    className={({ isActive }) => 
                        clsx(
                            css.navItem,
                            css[type],
                            {
                                [css.active]: isActive,
                                [css.activeMenu]: isActive && !isHeader,
                                [css.activeHeader]: isActive && isHeader,
                            }
                        )
                    }
                    >
                        Dictionary
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to={'/recommend'}
                    className={({ isActive }) => 
                        clsx(
                            css[type],
                            {
                                [css.activeMenu]: isActive && !isHeader,
                                [css.activeHeader]: isActive && isHeader,
                            }
                        )
                    }
                    >
                        Recommend
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to={'/training'}
                    className={({ isActive }) => 
                        clsx(
                            css[type],
                            {
                                [css.activeMenu]: isActive && !isHeader,
                                [css.activeHeader]: isActive && isHeader,
                            }
                        )
                    }
                    >
                        Training
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}