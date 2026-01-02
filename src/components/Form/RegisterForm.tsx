import css from './Form.module.css';

import { 
    Formik,
    Form,
    Field,
    type FormikHelpers,
    ErrorMessage
} from "formik";
import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import type { RegisterRequest } from '../../types/userTypes';
import { RegistrationSchema } from '../../validation/registrationSchema'
import { register } from '../../services/authServices';
import clsx from 'clsx';
import { useAuth } from '../../auth/useAuth';
import toast from 'react-hot-toast';

export default function RegisterForm () {
    const fieldId = useId();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const initialRegister: RegisterRequest = {
        username: '',
        email: '',
        password: '',
    };

     const handleRegister = async (
            values: RegisterRequest,
            actions: FormikHelpers<RegisterRequest>
        ) => {
            try {
            const user = await register(values);
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
            <h2 className={css.title}>Register</h2>
            <p className={css.text}>To start using our services, please fill out the registration form below. All fields are mandatory:</p>
            <Formik
                initialValues={initialRegister}
                validationSchema={RegistrationSchema}
                onSubmit={handleRegister}
            >
                {({ errors, touched, values }) => (
                    <Form>
                    <fieldset className={css.formField}>
                        <Field
                        className={clsx(css.formElement, {
                                [css.formElementError]: touched.username && errors.username,
                                [css.formElementSuccess]: touched.username && !errors.username,
                            })}
                        type='text'
                        name='username'
                        id={`${fieldId}-username`}
                        placeholder='Name'
                        />
                        <ErrorMessage
                        name='username'
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
                        {touched.username && !errors.username && values.username && (
                            <span className={css.success}>
                                <svg
                                className={css.messageIcon}
                                width={16}
                                height={16}
                                >
                                    <use href='/public/sprite.svg#icon-checkbox-circle-fill' />
                                </svg>
                                Correct name
                            </span>
                        )}

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
                            type={showPassword ? 'text' : 'password'}
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
                        Register
                    </button>
                </Form>
            )}
            </Formik>

            <Link 
            to='/login'
            className={css.link}
            >
                Login
            </Link>
        </div>
    )
}