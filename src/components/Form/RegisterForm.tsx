import css from './Form.module.css';

import { 
    Formik,
    Form,
    Field,
    type FormikHelpers
} from "formik";
import { useId } from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import type { RegisterRequest } from '../../types/userTypes';
import { register } from '../../services/authServices';

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
        <div>
            <h2 className={css.title}>Register</h2>
            <p className={css.text}>To start using our services, please fill out the registration form below. All fields are mandatory:</p>
            <Formik
                initialValues={initialRegister}
                onSubmit={handleRegister}
            >
                <Form>
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

                    <button 
                    type="submit"
                    className={css.btn}
                    >
                        Register
                    </button>
                </Form>
            </Formik>

            <Link to='/login'>Login</Link>
        </div>
    )
}