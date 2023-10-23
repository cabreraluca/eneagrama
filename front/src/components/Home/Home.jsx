import { Button } from '@material-tailwind/react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClockIcon } from "@heroicons/react/24/solid";
import { useAuth } from '../../hooks';

export const Home = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <section className='w-[100%] h-[100%]'>
            {!user.started ? 
            <div className='w-[100%] h-[100%] flex flex-col xl:flex-row items-center justify-center xl:justify-around gap-5 pt-6'>
                <h1 className='text-[2.5rem] lg:text-[2.5rem] 2xl:text-[3rem] font-bold w-[100%] xl:w-[50%] bg-gradient-to-r from-red-500 from-10 via-pink-500 via-10 to-yellow-500 to-80  bg-clip-text  text-transparent text-center'>¡Completa tu eneagrama!</h1>
                <div className='flex items-center flex-col gap-6 w-[100%] xl:w-[60%] font-semibold mt-20'>
                    <h2 className='2xl:text-[1.2rem]'><ClockIcon className='w-[2rem] text-indigo-900 inline'/> Tiempo estimado: 20-30 min.</h2>
                    <p className='w-[65%] leading-8 2xl:text-[1.2rem]'>
                      Debes tomarte un tiempo tranquilo/a, responderlo sin pensar demasiado y con total honestidad hacia ti mismo, en base a lo que sientas en este momento de tu vida. No lo analices con la mente. Tendrás que presionar el boton <span className='font-bold'>"SI"</span> en los enunciados con los cuales te sientas identificado o que te suela pasar frecuentemente y presionar el boton <span className='font-bold'>"NO"</span> en los que no sea así, o no te sientas identificado para nada.
                      No podrás volver a una pregunta que ya has respondido.
                      <span className='block text-orange-600 font-bold text-xl mt-4'>Recomendación</span> Una vez comenzado el test recomendamos que se finalice en el momento para poder generar un informe lo más acertado posible.
                    </p>
                    {user.testEnabled?<Button className='bg-indigo-900 xl:h-[3rem] xl:w-[15rem] mt-6 xl:mt-10' size='lg' onClick={() => {navigate('/cuestionario')}}>
                        Realizar test
                    </Button> : 
                    <h3 className='2xl:text-[1.2rem] text-red-500'>Debes esperar que te habiliten el test</h3>
                    }
                </div>
            </div> 
            : 
            <div>
                {user.finished ? 
                <div className='w-[100%] h-[70vh] 2xl:h-[60vh] flex flex-col xl:flex-row items-center justify-center xl:justify-around gap-5 pt-6'>
                <h1 className='text-[2.5rem] lg:text-[2.5rem] 2xl:text-[3rem] font-bold w-[100%] xl:w-[80%] bg-gradient-to-r from-red-500 from-10 via-pink-500 via-10 to-yellow-500 to-80  bg-clip-text  text-transparent text-center'>¡Has completado el test!</h1>
                <div className='flex items-center flex-col gap-6 w-[100%] xl:w-[60%] font-semibold mt-20'>
                    <h2 className='w-[55%] text-center leading-8 2xl:text-[1.2rem]'>
                    ¡Has terminado el test con exito! Para volver a ver tus resultados puedes ir al apartado <span className='font-bold text-indigo-900'>"Mis resultados"</span> en la parte superior derecha.
                    </h2>
                </div>
            </div>
                : 
                <div className='w-[100%] h-[70vh] 2xl:h-[60vh] flex flex-col xl:flex-row items-center justify-center xl:justify-around gap-5 pt-6'>
                    <h1 className='text-[2.5rem] lg:text-[2.5rem] 2xl:text-[3rem] font-bold w-[100%] xl:w-[50%] bg-gradient-to-r from-red-500 from-10 via-pink-500 via-10 to-yellow-500 to-80  bg-clip-text  text-transparent text-center'>¡Continua tu eneagrama!</h1>
                    <div className='flex items-center flex-col gap-6 w-[100%] xl:w-[60%] font-semibold mt-20'>
                        <h2 className='w-[65%] leading-8 2xl:text-[1.2rem] text-center'>
                        No has terminado el test, recuerda que recomendamos finalizarlo una vez comenzado para un mejor resultado.
                        </h2>
                        {<Button className='bg-indigo-900 xl:h-[3rem] xl:w-[15rem] mt-6 xl:mt-10' size='lg' onClick={() => {navigate('/cuestionario')}}>
                            Continuar test
                        </Button> 
                        }
                    </div>
                </div> }
            </div>}
        </section>
    )
}

