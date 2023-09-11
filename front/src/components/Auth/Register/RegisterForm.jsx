import React, { useEffect } from 'react'
import {Form} from "semantic-ui-react"
import {useFormik} from 'formik'
import { Auth } from '../../../api'
import { useAuth } from '../../../hooks'
import { registerInitialValues, registerValidationSchema } from './RegisterForm.form'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.css'

const authController = new Auth();

export const RegisterForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: registerInitialValues(),
        validationSchema: registerValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                await authController.register(formValue);
                navigate("/login");
            } catch (error) {
                console.log(error)
            }
        }
    })

  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
        <Form.Input name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
        <Form.Input name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
        <Form.Input name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
        <Form.Input name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
        <Form.Checkbox 
            name='termsAccepted' 
            label="He leído y acepto las politicas de privacidad"
            onChange={(_, data)=> formik.setFieldValue("termsAccepted", data.checked)}
            checked={formik.values.termsAccepted}
            error={formik.errors.termsAccepted}
        />
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            Crear cuenta
        </Form.Button>
    </Form>
  )
}