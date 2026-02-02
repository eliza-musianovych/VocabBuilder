import { NavLink } from 'react-router-dom';
import css from './LearningActions.module.css'

export default function LearningActions () {
    return(
        <div 
        className={css.container}
        >
            <button
            type='button'
            className={css.btn}
            >
                Add word 
                <svg
                className={css.icon}
                width={20}
                height={20}
                >
                    <use href='/sprite.svg#icon-plus' />
                </svg>
            </button>
            <NavLink 
            to={'/training'}
            className={css.btn}
            >
                Train oneself 
                <svg
                className={css.icon}
                width={20}
                height={20}
                >
                    <use href='/sprite.svg#icon-switch-horizontal-01' />
                </svg>
            </NavLink>
        </div>
    )
}