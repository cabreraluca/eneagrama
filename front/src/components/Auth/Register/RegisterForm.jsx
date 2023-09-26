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
    <section className='formContainer'>
        <div className='logoContainer'>
            <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp" alt="" />
        </div>
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <section className='inputsForm'>
                <label htmlFor="email">Email</label>
                <Form.Input id="email" className='inputsRegister' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="firstname">Nombre</label>
                <Form.Input id="firstname" className='inputsRegister' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="lastname">Apellido</label>
                <Form.Input id="lastname" className='inputsRegister' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="password">Contraseña</label>
                <Form.Input id="passoword" className='inputsRegister' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="repeatPassword">Repita la contraseña</label>
                <Form.Input id="repeatPassoword" className='inputsRegister' name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
            </section>
            <Form.Checkbox
                className='checkBox inline-block' 
                name='termsAccepted' 
                label="He leído y acepto las politicas de privacidad"
                onChange={(_, data)=> formik.setFieldValue("termsAccepted", data.checked)}
                checked={formik.values.termsAccepted}
                error={formik.errors.termsAccepted}
            />
            <Form.Button className="buttonRegister" type='submit' primary fluid loading={formik.isSubmitting}>
                Crear cuenta
            </Form.Button>
            <ToastContainer/>
            <section className='buttonsRegister'>
                <p>¿Ya tienes cuenta?</p><Form.Button onClick={() => {navigate('/')}} className='buttonIS'>Inicia sesión.</Form.Button>
            </section>
        </Form>
    </section>
  )
}