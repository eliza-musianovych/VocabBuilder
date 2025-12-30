import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .required(),

    password: Yup.string()
    .matches(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/, 'Error password')
    .required(),
});