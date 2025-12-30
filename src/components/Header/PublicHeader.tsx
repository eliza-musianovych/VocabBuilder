import css from './PublicHeader.module.css'

export default function PublicHeader () {
    return (
        <header className={css.header}>
            <div className={css.logo}>
                <svg
                width={40}
                height={40}
                >
                    <use href='/public/sprite.svg#icon-Craftwork' />
                </svg>
                <p className={css.logoText}>VocabBuilder</p>
            </div>
        </header>
    )
}