import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react';
import {useFormik} from 'formik'
import { User } from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import {initialValues, passwordValidationSchema} from './ChangePassword.Form'
import { Button } from '@material-tailwind/react';

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
    <div className='w-[100%] h-[95vh] lg:h-[80vh] 2xl:h-[60vh]'>
        <Form onSubmit={formSubmit} className='flex flex-col gap-4 items-center justify-center h-[100%]'>
          <div>
            <img src="https://mapapersonal.com/wp-content/uploads/2019/09/logo-mapa-personal.png.webp" alt="logo" className='h-[6rem] lg:h-[7rem] 2xl:h-[8rem]'/>
          </div>
          <Form.Input name="password" className='border-2 border-orange-600 rounded-md p-2' type='password'placeholder="Nueva contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
          <Form.Input name="repeatPassword" className='border-2 border-orange-600 rounded-md p-2' type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
            <Button type="submit" size='sm' className='bg-indigo-900'>
                    Cambiar contraseña
            </Button>
            <ToastContainer />
        </Form>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2b2c91" fill-opacity="0.7" d="M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,229.3C672,245,768,235,864,202.7C960,171,1056,117,1152,85.3C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
  )
}
