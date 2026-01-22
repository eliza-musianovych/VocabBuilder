import css from './Logo.module.css'
import { NavLink } from 'react-router-dom'

export default function Logo () {
    return (
        <div className={css.logo}>
            <NavLink
            to={'/dictionary'}
            >
                <svg
                className={css.icon}
                >
                    <use href='/sprite.svg#icon-Craftwork' />
                </svg>
                <p className={css.logoText}>VocabBuilder</p>
            </NavLink>
        </div>
    )
}