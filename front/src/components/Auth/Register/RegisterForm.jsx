import React from 'react'
import {Form} from "semantic-ui-react"
import {useFormik} from 'formik'
import { Auth } from '../../../api'
import { registerInitialValues, registerValidationSchema } from './RegisterForm.form'

const authController = new Auth();

export function RegisterForm(props) {
    const {openLogin} = props;
    const formik = useFormik({
        initialValues: registerInitialValues(),
        validationSchema: registerValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                await authController.register(formValue);
                openLogin();
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
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