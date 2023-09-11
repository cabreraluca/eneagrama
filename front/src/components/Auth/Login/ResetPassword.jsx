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
        <div className='resetPassContainer'>
            <Form className='formReset' onSubmit={formSubmit}>
                <section className='resetContainerForm'>
                    <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="" />
                    <h2>Recuperá tu contraseña</h2>
                    <p>Introduce tu correo electrónico para cambiar tu contraseña.</p>
                </section>
                <section className='resetInputContainer'>
                    <Form.Input
                        className='resetInput'
                        name='email' 
                        placeholder="Correo electronico"
                        onChange={(e)=> setEmail(e.value)} 
                    />
                    <Form.Button className='buttonResetPass' type="submit" primary fluid>
                            Enviar correo electrónico
                    </Form.Button>
                </section>
            </Form>
        </div>
    )
}