import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import {useFormik} from 'formik'
import { User } from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import {initialValues, passwordValidationSchema} from './ChangePassword.Form'

const userController = new User();

export function ChangePassword() {
    const [userData, setUserData] = useState();
    const {pathname} = useLocation();
    const {logout} = useAuth()
    const token = pathname.replace("/reset-password/", "");
    const navigate = useNavigate()

    const notify = () =>{
      toast.success('Contraseña cambiada correctamente, redirigiendo al inicio de sesión', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setTimeout(() => {
            navigate('/')
            logout()
            }, "4000");
  }

    useEffect(() => {
        const fetchUser = async () =>{
            const userDB = await userController.getUserByToken(token);
            setUserData(userDB);
            if(!userDB){
              navigate('/')
            }
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
          notify()
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
            <ToastContainer />
        </Form>
    </div>
  )
}
