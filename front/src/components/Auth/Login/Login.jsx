import React from 'react';
import {Form} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';

import { validationSchema, initialValues } from './LoginForm';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../../pages/admin/Auth';

const authController = new Auth();


export const Login = () => {
  const {login} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) =>{
      try {
        const response = await authController.login(formValue);
        console.log(response)
        authController.setAccesstoken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
      }catch (error){
        console.log(error)
      }
    }
  })
  return (
    <section className='formContainer'>
      <div className='logoContainer'>
        <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="" />
        <h1>Viaja dentro de tí mismo</h1>
      </div>
      <Form onSubmit={formik.handleSubmit} className='formLogin'>
        <div>
          <label htmlFor="email">Email</label>
          <Form.Input
              name='email' 
              placeholder="Correo electronico"
              onChange={formik.handleChange} 
              value={formik.values.email} 
              error={formik.errors.email}
              className='input'
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <Form.Input 
              name='password' 
              type='password' 
              placeholder="Contraseña" 
              onChange={formik.handleChange} 
              value={formik.values.password} 
              error={formik.errors.password}
              className='input'/>
        </div>
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting} className='buttonEnviar'>
                Ingresar
        </Form.Button>
      </Form>
    </section>
  )
}
