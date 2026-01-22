import css from './Form.module.css';

import { 
    Formik,
    Form,
    Field,
    type FormikHelpers,
    ErrorMessage
} from "formik";
import axios from 'axios';
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
        name: '',
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
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                switch (status) {
                  case 400:
                    toast.error('Будь ласка, перевірте введені дані.');
                    break;
                  case 401:
                    toast.error('Невірна електронна пошта або пароль.');
                    break;
                  case 409:
                    toast.error('Користувач з такою електронною поштою вже існує.');
                    break;
                  case 500:
                    toast.error('Сталася помилка на сервері. Спробуйте пізніше.');
                    break;
                  default:
                    toast.error('Щось пішло не так. Спробуйте ще раз.');
                }
              } else {
                toast.error('Невідома помилка.');
              }
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
                                [css.formElementError]: touched.name && errors.name,
                                [css.formElementSuccess]: touched.name && !errors.name,
                            })}
                        type='text'
                        name='name'
                        id={`${fieldId}-name`}
                        placeholder='Name'
                        />
                        <ErrorMessage
                        name='name'
                        >
                            {msg => (
                                <span className={css.error}>
                                    <svg 
                                    className={css.messageIcon}
                                    width={16}
                                    height={16}
                                    >
                                        <use href='/sprite.svg#icon-error-warning-fill' />
                                    </svg>
                                    {msg}
                                </span>
                            )}
                        </ErrorMessage>
                        {touched.name && !errors.name && values.name && (
                            <span className={css.success}>
                                <svg
                                className={css.messageIcon}
                                width={16}
                                height={16}
                                >
                                    <use href='/sprite.svg#icon-checkbox-circle-fill' />
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
                                        <use href='/sprite.svg#icon-error-warning-fill' />
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
                                    <use href='/sprite.svg#icon-checkbox-circle-fill' />
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
                                    <use href='/sprite.svg#icon-eye' />
                                </svg> :
                                <svg
                                width={20}
                                height={20}
                                >
                                    <use href='/sprite.svg#icon-eye-off' />
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
                                        <use href='/sprite.svg#icon-error-warning-fill' />
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
                                    <use href='/sprite.svg#icon-checkbox-circle-fill' />
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