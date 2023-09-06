import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks';
import { Form } from 'semantic-ui-react';

export function ResetPassword() {
    const [email, setEmail] = useState("");

    const formSubmit = (e) =>{
        e.preventDefault();

        useEffect(() => {
            sendMail({
                from: "no-responder@eneagrama.com",
                to: email,
                subject: "Recuperar contraseña",
                text: `Hemos recibido tu solicitud para restablecer tu contraseña. Para hacerlo, haz click en el siguiente link:
                   http://localhost:3000/reset-password/prueba
                   Si no solicitaste el cambio de contraseña, ignora este mail.
            `,
            });
        }, [email]);
    };
    return (
        <div className='resetPassContainer'>
            <Form className='formReset' onSubmit={formSubmit}>
                <section className='resetContainerForm'>
                    <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="" />
                    <h2>Recuperá tu contraseña</h2>
                    <p>Introduce tu correo electrónico para cambiar tu contraseña.</p>
                </section>
                <section className='resetInputContainer'>
                    <Form.Input
                        className='resetInput'
                        name='email' 
                        placeholder="Correo electronico"
                        onChange={(e)=> setEmail(e.value)} 
                    />
                    <Form.Button className='buttonResetPass' type="submit" primary fluid>
                            Enviar correo electrónico
                    </Form.Button>
                </section>
            </Form>
        </div>
    )
}