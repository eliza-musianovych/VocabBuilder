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
import type { RegisterRequest } from '../../types/userTypes';
import { RegistrationSchema } from '../../validation/registrationSchema'
import { register } from '../../services/authServices';
import clsx from 'clsx';

export default function RegisterForm () {
    const fieldId = useId();

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
            await register(values);
            actions.resetForm();
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
                        className={css.formElement}
                        type='text'
                        name='username'
                        id={`${fieldId}-username`}
                        placeholder='Name'
                        />

                        <Field
                        className={css.formElement}
                        type='email'
                        name='email'
                        id={`${fieldId}-email`}
                        placeholder='Email'
                        />

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