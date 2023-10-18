import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import { Auth } from '../../../api';
import {useFormik} from 'formik'
import { emailInitialValues, emailValidationSchema} from './ResetPassword.form';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'
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
        <div className='h-[100vh] flex items-center justify-center containerResetPass'>
            <Form className='formReset h-[50%] md:p-4 md:rounded-full lg:h-[55%] lg:w-[40%] flex justify-between 2xl:justify-around items-center flex-col md:bg-white' onSubmit={formik.handleSubmit}>
                <section className='resetContainerForm flex flex-col items-center'>
                    <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp" alt="logo" className='h-[6rem] lg:h-[7rem] 2xl:h-[9rem]'/>
                    <h1 className='text-[1.2rem] mt-4 font-semibold'>Recuperá tu contraseña</h1>
                    <p className='text-center'>Introduce tu correo electrónico para cambiar tu contraseña.</p>
                </section>
                <section className='resetInputContainer flex flex-col items-center lg: p-4'>
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