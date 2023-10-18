import React, { useContext, useEffect } from 'react'
import {Form} from "semantic-ui-react"
import { useFormik } from 'formik';
import { EditUserInitialValues, EditUserValidationSchema } from './EditUserForm';
import { User } from '../../api';
import { Button, Dialog, Select, Option } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import "./User.css"
import { useAuth } from '../../hooks';

const userController = new User();

export const EditUser = (props) => {
    const {user} = useAuth()
    const {role} = user;
    const { fetchUsers, userData, accessToken, companies} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
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

    const onDelete = async (userId) =>{
        await userController.deleteUser(accessToken, userId);
        handleOpen()
        fetchUsers()
    }

    const onResetResults = async (userId) =>{
        await userController.updateUser(userId, {results: [], finished: false, started: false})
        handleOpen();
        localStorage.removeItem("id");
        localStorage.removeItem("storageResults")
        fetchUsers();
    }
    const formik = useFormik({
        initialValues: EditUserInitialValues(userData),
        validationSchema: EditUserValidationSchema(userData),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                console.log(formValue)
                await userController.updateUser(userData._id, formValue);
                fetchUsers()
                handleOpen()
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
            <div>
                <Button className="flex items-center gap-3" size="sm" onClick={()=> handleOpen()}>
                    <PencilIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                >
                    <Form onSubmit={formik.handleSubmit} className='mx-auto h-[100%] formNewUser'>
                        <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <Form.Input id="email" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
                        </section>
                        {userData.role !== 'company' ? <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="firstname" className='font-semibold'>Nombre</label>
                            <Form.Input id="firstname" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
                        </section> : ""}
                        {userData.role !== 'company' ? <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="lastname" className='font-semibold'>Apellido</label>
                            <Form.Input id="lastname" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
                        </section> : ""}
                        <section className='flex flex-col mb-2 w-[100%]'>
                            {role === 'admin' && !userData.company &&userData.role !== "company"?<Form.Checkbox 
                                id="testEnabled" 
                                className='checkBox inline-block'                 
                                name='termsAccepted' 
                                label="Habilitar test"
                                onChange={(_, data)=> formik.setFieldValue("testEnabled", data.checked)}
                                checked={formik.values.testEnabled}
                                error={formik.errors.testEnabled}
                            /> : ""}
                        </section >
                        <section className='flex flex-col gap-2 mb-2 w-[100%]'>
                            {role === 'admin' ?<Select className="bg-white mb-2" label="Seleccione el rol"
                                onChange={(element) => { 
                                formik.setFieldValue('role', element)
                                }}>
                                    {roleOptions.map((role) => <Option className="bg-white" key={role.key} value={role.value} >{role.text}</Option>)}
                            </Select> : ""}
                            {role === 'admin'? <Select label='Seleccione la empresa' onChange={(element) => {
                                formik.setFieldValue("company", element)
                            }}>
                                {companies.map((company) => <Option key={company._id} value={company._id}>{company.companyName}</Option>)}
                            </Select> : ""}
                        </section>
                        <section className='flex gap-2 mb-2 w-[100%]'>                         
                            {userData.started?  <Button size='sm' className='w-[100%]' onClick={() => onResetResults(userData._id)}>Reiniciar test</Button> : ""} 
                            <Button  size='sm' className='w-[100%]' color='red' onClick={() => onDelete(userData._id)}>Eliminar usuario</Button>
                        </section>    
                        <Button size='sm' className='w-[100%]' type='submit'>
                                Aplicar cambios
                       </Button>                             
                    </Form>
                </Dialog>
            </div>
  )
}
