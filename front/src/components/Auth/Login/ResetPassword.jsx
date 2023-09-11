import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import { Auth } from '../../../api';
import {useFormik} from 'formik'
import { emailInitialValues, emailValidationSchema} from './ResetPassword.form';
const AuthController = new Auth();

export function ResetPassword() {
    const [email, setEmail] = useState("");

    useEffect(() => {
      console.log(email);
    
    }, [email])

    const formik = useFormik({
        initialValues: emailInitialValues(),
        validationSchema: emailValidationSchema(),
        validateOnChange: false,
    });

    const formSubmit = async (e) =>{
        e.preventDefault();
        const {email} = formik.values;
        console.log(email)
        const emailSent = await AuthController.sendPasswordResetEmail(email);
        console.log(emailSent);
    }
    

    return (
        <div>
        <h2>Ingresa tu correo electrónico para restablecer tu contraseña</h2>
        <Form onSubmit={formSubmit}>
            <Form.Input name="email" type='email'placeholder="Email" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
            <Form.Button type="submit" primary fluid>
                    Enviar correo electrónico
            </Form.Button>
        </Form>
        </div>
    )
}