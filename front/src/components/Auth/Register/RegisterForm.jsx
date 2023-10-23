import React, { useEffect } from 'react'
import {Form} from "semantic-ui-react"
import {useFormik} from 'formik'
import { Auth } from '../../../api'
import './Register.css'
import { registerInitialValues, registerValidationSchema } from './RegisterForm.form'
import { Login, validationSchema } from '../Login'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const authController = new Auth();

export const RegisterForm = () => {

    const labelStyle = "font-semibold";

    const navigate = useNavigate();

    const notify = () => {
        toast.success('Cuenta creada con éxito, será redirigido al inicio de sesión', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setTimeout(() => {
            navigate('/')
            }, "4000");
        
    };

    const notifyError = (error) =>{
        console.log(error)
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    const formik = useFormik({
        initialValues: registerInitialValues(),
        validationSchema: registerValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                await authController.register(formValue);
                notify();
            } catch (error) {
                notifyError(error.message);
            }
        }
    })

  return (
    <section className='formRegisterContainer h-[100%] flex flex-col items-center justify-center '>
        <div className='bg-white/90 flex flex-col justify-around rounded-3xl w-[80vw] sm:w-[60%] md:w-[50%] lg:w-[30%] h-[100vh]'>
            <div className='flex items-center justify-center'>
                <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp" alt="logo" className='h-[5rem] lg:h-[7rem]'/>
            </div>
            <Form className='register-form flex flex-col items-center gap-4 w-[100%]' onSubmit={formik.handleSubmit}>
                <section className='inputsForm lg:w-[60%]'>
                    <label htmlFor="email" className={labelStyle}>Email</label>
                    <Form.Input id="email" className='inputsRegister' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
                </section>
                <section className='inputsForm lg:w-[60%]'>
                    <label htmlFor="firstname" className={labelStyle}>Nombre</label>
                    <Form.Input id="firstname" className='inputsRegister' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
                </section>
                <section className='inputsForm lg:w-[60%]'>
                    <label htmlFor="lastname" className={labelStyle}>Apellido</label>
                    <Form.Input id="lastname" className='inputsRegister' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
                </section>
                <section className='inputsForm lg:w-[60%]'>
                    <label htmlFor="password" className={labelStyle}>Contraseña</label>
                    <Form.Input id="password" className='inputsRegister' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
                </section>
                <section className='inputsForm lg:w-[60%]'>
                    <label htmlFor="repeatPassword" className={labelStyle}>Repita la contraseña</label>
                    <Form.Input id="repeatPassword" className='inputsRegister' name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
                </section>
                <Form.Button className="buttonRegister" type='submit' primary fluid loading={formik.isSubmitting}>
                    Crear cuenta
                </Form.Button>
                <ToastContainer/>
            </Form>
        </div>
        <section className='buttonsRegister flex items-center gap-2 h-[10vh]'>
                    <p className='font-semibold text-white'>¿Ya tienes cuenta?</p><Form.Button onClick={() => {navigate('/')}} className='buttonIS'>Inicia sesión.</Form.Button>
        </section>
    </section>
  )
}