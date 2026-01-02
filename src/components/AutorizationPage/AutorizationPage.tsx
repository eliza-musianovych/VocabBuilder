import css from './AutorizationPage.module.css'

import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import clsx from 'clsx';

export default function AutorizationPage ({ type }: { type: 'register' | 'login' }) {
    return (
        <section className={css.section}>
            <div className={css.imgContainer}>
                <img 
                className={css.img}
                src="/public/img/illustration.png" 
                srcSet="/public/img/illustration.png 1x, /public/img/illustrationx2.png 2x"
                alt="illustration" 
                />
                <p 
                className={clsx(
                    css.words, 
                    type === 'register' && css.hiddenWords
                    )}>
                        Word  ·  Translation  ·  Grammar  ·  Progress
                </p>
            </div>
            {type === 'register' ? 
            <RegisterForm /> : 
            <LoginForm />
            }
            <div className={css.gradient}></div>
        </section>
    )
}