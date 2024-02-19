import React, { useState} from 'react';
import {Form} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { ToastContainer, toast } from 'react-toastify';
import { validationSchema, initialValues } from './LoginForm';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const authController = new Auth();

export const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const notify = (error) => {
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
};
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);
        authController.setAccesstoken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
      } catch (error) {
        notify(error.msg);
      }
    }
  })
  return (
    <section className='w-[100vw] h-[100vh] flex flex-col items-center justify-center ContainerLogin bg-bottom '>
      <section className='formContainer flex flex-col justify-center gap-10'>
        <div className='w-[100vw] flex items-center justify-center'>
          <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp" alt="" className='h-[5.5rem] lg:h-[7rem] 2xl:h-[9rem]'/>
        </div>
        <Form onSubmit={formik.handleSubmit} className='flex flex-col items-center gap-4'>
          <section className='lg:w-[20vw]'>
            <label htmlFor="email" className='font-semibold '>Email</label>
            <Form.Input
                id="email"
                name='email' 
                placeholder="Correo electronico"
                onChange={formik.handleChange} 
                value={formik.values.email} 
                error={formik.errors.email}
                className='inputLogin'
            />
          </section>
          <section className='lg:w-[20vw]'>
            <label htmlFor="password" className='font-semibold '>Contraseña</label>
            <Form.Input 
                id="password"
                name='password' 
                type='password' 
                placeholder="Contraseña" 
                onChange={formik.handleChange} 
                value={formik.values.password} 
                error={formik.errors.password}
                className='inputLogin'/>
          </section>
          <Form.Button type="submit" primary fluid loading={formik.isSubmitting} className='buttonEnviar '> 
                  Ingresar
          </Form.Button>
          <ToastContainer />
          <section className='flex flex-col items-center'>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold textNewAccount'>¿No tienes cuenta?</p>
              <Form.Button className='newAccountButton' onClick={()=>navigate('/register')}>
                Regístrate.
              </Form.Button>
            </div>
            <Form.Button className='resetPass' onClick={()=> navigate("/reset-password")}>
                    ¿Olvidaste tu contraseña?
            </Form.Button>
          </section>
        </Form>
      </section>
    </section>
  )
}
