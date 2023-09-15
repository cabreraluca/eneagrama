import React from 'react'
import {Form} from "semantic-ui-react"
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {createUserInitialValues, createUserValidationSchema} from './CreateUserForm'
import { User } from '../../api';

const userController = new User();

export const CreateUser = (props) => {
    const {accessToken} = props;
    const roleOptions = [{
            key: "admin",
            text: "Administrador",
            value: "admin"
        },
        {
            key: "user",
            text: "Usuario",
            value: "user"
        },
        {
            key: "company",
            text: "Empresa",
            value: "company"
        }
    ];


    const formik = useFormik({
        initialValues: createUserInitialValues(),
        validationSchema: createUserValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                await userController.createUser(accessToken, formValue);
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div>
        <Form className='createUserForm' onSubmit={formik.handleSubmit}>
            <section className='inputsForm'>
                <label htmlFor="email">Email</label>
                <Form.Input className='inputsRegister' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="name">Nombre</label>
                <Form.Input className='inputsRegister' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="lastname">Apellido</label>
                <Form.Input className='inputsRegister' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="password">Contraseña</label>
                <Form.Input className='inputsRegister' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
            </section>
            <section className='inputsForm'>
                <label htmlFor="password">Repita la contraseña</label>
                <Form.Input className='inputsRegister' name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
            </section>
            <section className='inputsForm'>
                <Form.Dropdown
                    name="role"
                    label="Rol"
                    placeholder="Selecciona un rol"
                    fluid
                    selection
                    options={roleOptions}
                    onChange={(_, data) => formik.setFieldValue('role', data.value)}
                    value={formik.values.role}
                    error={formik.errors.role}
                />
            </section>
            <Form.Button type='submit' className="buttonRegister" primary fluid loading={formik.isSubmitting}>
                Crear usuario
            </Form.Button>               
        </Form>
    </div>
  )
}
