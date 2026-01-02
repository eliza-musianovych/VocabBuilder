import css from './Form.module.css';

import clsx from 'clsx';
import { 
    Formik,
    Form,
    Field,
    type FormikHelpers,
    ErrorMessage
} from "formik";
import toast from 'react-hot-toast';
import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import type { LoginRequest } from '../../types/userTypes';
import { LoginSchema } from '../../validation/loginSchema';
import { login } from '../../services/authServices';
import { useAuth } from '../../auth/useAuth';

export default function LoginForm () {
    const fieldId = useId();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const initialLogin: LoginRequest = {
        email: '',
        password: '',
    };

     const handleLogin = async (
            values: LoginRequest,
            actions: FormikHelpers<LoginRequest>
        ) => {
            try {
            const user = await login(values);
            setUser(user);
            navigate('/dictionary');
            actions.resetForm();
            } catch {
                toast.error(
                    'Something went wrong. Try later'
                );
            } finally {
                actions.setSubmitting(false);
            }
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
                    <fieldset className={css.formField}>

                        <Field
                        className={clsx(css.formElement, {
                                [css.formElementError]: touched.email && errors.email,
                                [css.formElementSuccess]: touched.email && !errors.email,
                            })}
                        type='email'
                        name='email'
                        id={`${fieldId}-email`}
                        placeholder='Email'
                        />
                        <ErrorMessage
                        name='email'
                        >
                            {msg => (
                                <span className={css.error}>
                                    <svg 
                                    className={css.messageIcon}
                                    width={16}
                                    height={16}
                                    >
                                        <use href='/public/sprite.svg#icon-error-warning-fill' />
                                    </svg>
                                    {msg}
                                </span>
                            )}
                        </ErrorMessage>
                        {touched.email && !errors.email && values.email && (
                            <span className={css.success}>
                                <svg
                                className={css.messageIcon}
                                width={16}
                                height={16}
                                >
                                    <use href='/public/sprite.svg#icon-checkbox-circle-fill' />
                                </svg>
                                Correct email
                            </span>
                        )}

                        <div className={css.passwordContainer}>
                            <Field
                            className={clsx(css.formElement, {
                                [css.formElementError]: touched.password && errors.password,
                                [css.formElementSuccess]: touched.password && !errors.password,
                            })}
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
                        </div>
                        <ErrorMessage
                        name='password'
                        >
                            {msg => (
                                <span className={css.error}>
                                    <svg 
                                    className={css.messageIcon}
                                    width={16}
                                    height={16}
                                    >
                                        <use href='/public/sprite.svg#icon-error-warning-fill' />
                                    </svg>
                                    {msg}
                                </span>
                            )}
                        </ErrorMessage>
                        {touched.password && !errors.password && values.password && (
                            <span className={css.success}>
                                <svg
                                className={css.messageIcon}
                                width={16}
                                height={16}
                                >
                                    <use href='/public/sprite.svg#icon-checkbox-circle-fill' />
                                </svg>
                                Success password
                            </span>
                        )}
                    </fieldset>

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
}