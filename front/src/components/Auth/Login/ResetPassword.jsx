import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import { Auth } from '../../../api';
import {useFormik} from 'formik'
import { useAuth } from '../../../hooks';
import { emailInitialValues, emailValidationSchema} from './ResetPassword.form';
import { ToastContainer, toast } from 'react-toastify';
const AuthController = new Auth();
export function ResetPassword({user}) {
    const notify = () =>{
        toast.success('Email enviado', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    const formik = useFormik({
        initialValues: emailInitialValues(user?.email),
        validationSchema: emailValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                console.log(formValue);
                const {email} = formValue;
                console.log(email)
                notify()
                const emailSent = await AuthController.sendPasswordResetEmail(email);
            } catch (error) {
                console.log(error)
            }
        }
    });

    

    return (
        <div className='resetPassContainer'>
            <Form className='formReset' onSubmit={formik.handleSubmit}>
                <section className='resetContainerForm'>
                    <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp   " alt="" />
                    <h2>Recuperá tu contraseña</h2>
                    <p>Introduce tu correo electrónico para cambiar tu contraseña.</p>
                </section>
                <section className='resetInputContainer'>
                    <Form.Input
                        className='resetInput'
                        name='email' 
                        placeholder="Correo electronico"
                        value={formik.values.email} 
                        error={formik.errors.email} 
                        onChange={formik.handleChange} 
                    />
                    <Form.Button className='buttonResetPass' type="submit" primary fluid>
                            Enviar correo electrónico
                    </Form.Button>
                    <ToastContainer />
                </section>
            </Form>
        </div>
    )
}