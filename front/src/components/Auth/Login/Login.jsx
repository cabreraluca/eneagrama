import React from 'react';
import {Form} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { validationSchema, initialValues } from './LoginForm';
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
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
            name='email' 
            placeholder="Correo electronico"
            onChange={formik.handleChange} 
            value={formik.values.email} 
            error={formik.errors.email}
        />
        <Form.Input 
            name='password' 
            type='password' 
            placeholder="Contraseña" 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            error={formik.errors.password}/>
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Entrar
        </Form.Button>
        <Form.Button onClick={()=> navigate("/reset-password")}>
                ¿No puedes iniciar sesión?
        </Form.Button>
      </Form>
      
    </div>
  )
}
