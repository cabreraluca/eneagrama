import React from 'react';
import {Form} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { validationSchema, initialValues } from './LoginForm';

const authController = new Auth();


export function Login() {
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
    </Form>
  )
}
