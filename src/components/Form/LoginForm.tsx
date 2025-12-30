import css from './Form.module.css';

import { 
    Formik,
    Form,
    Field,
    type FormikHelpers,
    ErrorMessage
} from "formik";
import { useId } from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import type { LoginRequest } from '../../types/userTypes';
import { LoginSchema } from '../../validation/loginSchema';
import { login } from '../../services/authServices';

export default function RegisterForm () {
    const fieldId = useId();

    const [showPassword, setShowPassword] = useState(false);

    const initialLogin: LoginRequest = {
        email: '',
        password: '',
    };

     const handleLogin = async (
            values: LoginRequest,
            actions: FormikHelpers<LoginRequest>
        ) => {
            await login(values);
            actions.resetForm();
        };

    return (
        <div className={css.form}>
            <h2 className={css.title}>Login</h2>
            <p className={css.text}>Please enter your login details to continue using our service:</p>
            <Formik
                initialValues={initialLogin}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ errors, touched, values }) => (
                    <Form>

                    <Field 
                    className={css.formElement}
                    type='email' 
                    name='email' 
                    id={`${fieldId}-email`}
                    placeholder='Email'
                    />

                    <Field
                    className={css.formElement} 
                    type='password' 
                    name='password'
                    id={`${fieldId}-password`}
                    placeholder='Password' 
                    />
                    <button
                    className={css.showPassword}
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    >
                        {showPassword ? <svg
                        width={20}
                        height={20}
                        >
                            <use href='/public/sprite.svg#icon-eye' />
                        </svg> :
                        <svg
                        width={20}
                        height={20}
                        >
                            <use href='/public/sprite.svg#icon-eye-off' />
                        </svg>}
                    </button>
                    <ErrorMessage 
                    name='password'
                    >
                        {msg => (
                            <span className={css.error}>
                                <svg
                                width={20}
                                height={20}
                                >
                                    <use href='/public/sprite.svg#icon-error-warning-fill' />
                                </svg>
                                {msg}
                            </span>
                        )}
                    </ErrorMessage>

                    {touched.password && !errors.password && values.password && (
                        <span>
                            <span className={css.success}>
                                <svg
                                width={20}
                                height={20}
                                >
                                    <use href='/public/sprite.svg#icon-checkbox-circle-fill' />
                                </svg>
                                Success password
                            </span>
                        </span>
                    )}

                    <button 
                    type="submit"
                    className={css.btn}
                    >
                        Login
                    </button>
                </Form>
            )}
            </Formik>

            <Link 
            to='/register'
            className={css.link}
            >
                Register
            </Link>
        </div>
    )
};