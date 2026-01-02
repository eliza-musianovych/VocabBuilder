import css from './Logo.module.css'

export default function Logo () {
    return (
        <div className={css.logo}>
            <svg
            className={css.icon}
            >
                <use href='/public/sprite.svg#icon-Craftwork' />
            </svg>
            <p className={css.logoText}>VocabBuilder</p>
        </div>
    )
}