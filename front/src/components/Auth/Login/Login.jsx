import React, { useState} from 'react';
import {Form} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { validationSchema, initialValues } from './LoginForm';
import './Login.css'
import { AuthComponent } from '../../../pages/admin/Auth';
import { Users } from '../../Users/Users';
import { useNavigate } from 'react-router-dom';

const authController = new Auth();

export const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) =>{
      try {
        const response = await authController.login(formValue);
        authController.setAccesstoken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
      }catch (error){
        console.log(error)
      }
    }
  })
  return (
    <div>
    <section className='formContainer'>
      <div className='logoContainer'>
        <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="" />
        <h1>Viaja dentro de tí mismo</h1>
      </div>
      <Form onSubmit={formik.handleSubmit} className='formLogin'>
        <section>
          <label htmlFor="email" form='email'>Email</label>
          <Form.Input
              name='email' 
              placeholder="Correo electronico"
              onChange={formik.handleChange} 
              value={formik.values.email} 
              error={formik.errors.email}
              className='input'
          />
        </section>
        <section>
          <label htmlFor="password">Contraseña</label>
          <Form.Input 
              name='password' 
              type='password' 
              placeholder="Contraseña" 
              onChange={formik.handleChange} 
              value={formik.values.password} 
              error={formik.errors.password}
              className='input'/>
        </section>
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting} onClick={()=>navigate('/home')} className='buttonEnviar'>
                Ingresar
        </Form.Button>
        <section className='buttonsLogin'>
          <div style={{display: "flex", gap: ".5rem"}}>
            <p className='newAccount'>¿No tienes cuenta?</p>
            <Form.Button className='newAccountButton' onClick={()=>navigate('/register')}>
              Registrate.
            </Form.Button>
          </div>
          <Form.Button className='resetPass' onClick={()=> navigate("/reset-password")}>
                  ¿Olvidaste tu contraseña?
          </Form.Button>
        </section>
      </Form>
    </section>
    </div>
  )
}
