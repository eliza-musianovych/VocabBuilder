import css from './AutorizationPage.module.css'

import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import clsx from 'clsx';

type AutorizationPageProps = {
    type: 'register' | 'login';
};

export default function AutorizationPage ({ type }: AutorizationPageProps) {
    return (
        <main className={css.main}>
            <div className={css.imgContainer}>
                <img 
                className={css.img}
                src="/img/illustration.png" 
                srcSet="/img/illustration.png 1x, /img/illustrationx2.png 2x"
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
        </main>
    )
}