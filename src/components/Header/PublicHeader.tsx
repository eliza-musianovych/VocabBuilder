import Logo from '../Logo/Logo'
import css from './PublicHeader.module.css'

export default function PublicHeader () {
    return (
        <header className={css.header}>
            <Logo />
        </header>
    )
}