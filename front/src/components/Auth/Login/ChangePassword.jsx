import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import {useFormik} from 'formik'
import { User } from '../../../api';
import { useLocation } from 'react-router-dom';
import {initialValues, passwordValidationSchema} from './ChangePassword.Form'

const userController = new User();

export function ChangePassword() {
    const [userData, setUserData] = useState();
    const {pathname} = useLocation();
    const token = pathname.replace("/reset-password/", "");

    useEffect(() => {
        const fetchUser = async () =>{
            const user = await userController.getUserByToken(token);
            setUserData(user);
        }
        fetchUser()
    }, [token])
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: passwordValidationSchema(),
        validateOnChange: false,
    })

    const formSubmit = async (e) => {
        e.preventDefault();
        const { password, repeatPassword } = formik.values;
        const userId = userData._id;
        console.log(userData);
        userData.password = password;
        userData.resetPasswordToken = "";
        userData.resetPasswordExpires = "";
    
        if (password !== repeatPassword) {
          console.error("Las contraseñas no coinciden");
          return;
        }
    
        try {
          await userController.updateUser(userId, userData);
          //Agregar toastify de contraseña cambiada correctamente
          // Mandar al login
        } catch (error) {
          console.error( error);
        }
      }

  return (
    <div>
        <Form onSubmit={formSubmit}>
        <Form.Input name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
        <Form.Input name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
            <Form.Button type="submit" primary fluid>
                    Cambiar contraseña
            </Form.Button>
        </Form>
    </div>
  )
}
