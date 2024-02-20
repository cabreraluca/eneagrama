import React, {useEffect, useContext} from 'react'
import { QuestionsContext } from "../../context/QuestionsContext";

export const Result = ({results , flex} ) => {
  const resultMutado = [...results];
  const { informe, setInforme } = useContext(QuestionsContext);
  const ejesPolaridad = [
    {
      "nombre" : "ejeOrden", 
      "valor1" : results[0].puntaje,
      "valor2" : results[4].puntaje,
      "resultado" : results[0].puntaje + results[4].puntaje,
      "elemento" : "Hoy tu elemento AIRE está predominando en tu interior. Mucha mente, análisis, pensamientos y estructura.",
      "encimaMedia" : "Tu foco de atención está puesto en el orden, interno y externo. Quieres controlar que las cosas sucedan en el orden y formas que te has establecido o proyectado, para eso te enfocas en los procesos y en tener claridad para tomar decisiones, basándote en un análisis previo de la situación.",
      "altaMedia": `Estás teniendo una tendencia a controlar, evaluar y quizás juzgar a otros o a situaciones de tu vida que esperas que se den de la forma que tu proyectaste.
      Puede haber otras personas a tu alrededor que te perciban como alguien un poco rígido/a o inflexible y a su vez sentirse criticados o evaluados por ti.`,
      "peligro" : `Caer en el juicio de valor y control hacia ti, hacia los demás y a hacia la vida misma. Perderte en los detalles que consideran que No están bien es tu vida y por ellos no puedes vivir en paz y en plenitud.
      Transformación: Poner el foco de atención en lo verdaderamente Importante de la vida y para tu vida, y luego las formas que vayan en función de esto.
      `
    },{
      "nombre" : "ejeRelaciones",
      "valor1" : results[1].puntaje,
      "valor2" : results[5].puntaje,
      "resultado" : results[1].puntaje + results[5].puntaje,
      "elemento" : "Hoy tu elemento AGUA esta predominando en tu interior. Hay un gran foco de atención a tus vínculos afectivos.",
      "encimaMedia" : "Necesidad de acercamiento, de ir hacia ellos, de estar pendiente de las necesidades de los otros, querer complacerlos, ayudarlos, colaborar.",
      "altaMedia": `El poner tanta energía hacia los otros puede ser que inconscientemente lo hagas para de esa forma sentirte incluido, querido y seguro de su cariño. Esto puede estar afectando la atención a tus propias necesidades y cuidados. Si esto se prolonga en el tiempo puede causar que te veas relegado en tu propio bienestar, descanso, desarrollo personal, valoración y amor propio, buscando suplir esto de forma indirecta con el amor de otros hacia ti, a cambio de todo tu cuidado y atención hacia ellos.`,
      "peligro": `Caer en la dependencia Emocional y falta de valoración personal
      Transformación: Ser CON el otro y no para el otro.
      `
      
    },{
      "nombre" : "ejeImagen", 
      "valor1" : results[2].puntaje,
      "valor2" : results[6].puntaje,
      "resultado" : results[2].puntaje + results[6].puntaje,
      "elemento" : "Hoy tu elemento TIERRA está predominando en tu interior. Mucho foco de atención a cómo te muestras y te ven los demás. Foco en los logros y en lo económico/material.",
      "encimaMedia" : "Necesidad de mostrarse como una persona sin problemas, que los demás perciban una actitud positiva de uno mismo.",
      "altaMedia": results[2].puntaje > results[6].puntaje ? "Hay mucha energía puesta en querer transmitir a los demás y hacerles saber lo bien que le está yendo, que logra sus objetivos, comentar acerca de sus proyectos, negocios, etc. Si “me ven y conoces mis logros” puede que quieran contratarme, mirarme, y así obtener valoración de través de mi éxito." : "Hay mucha energía puesta en que los demás te vean bien, sin problemas, alegre, optimista, entusiasta. Hay una creencia de que No está bueno andar contando si tengo problemas, o estoy triste, ya que eso puede alejarlos de mí. La queja aleja…y yo quiero que quieran están conmigo. Entonces puede ser que los otros no se enteren de lo que verdaderamente sientes o te suceda y esto trae aparejado que no puedan tenderte una mano, ayudarte o sólo escuchar lo que está en tu corazón.",
      "peligro": `Caer en la superficialidad en los vínculos. 

      Transformación: Salir a la vida desde la profundidad de tu ser, de tu sentir y los valores verdaderamente importantes para tu vida. De lo profundo a la superficie, y no al revés.
      `
    },{
      "nombre" : "ejeFuerza", 
      "valor1" : results[3].puntaje,
      "valor2" : results[7].puntaje,
      "resultado" : results[3].puntaje + results[7].puntaje,
      "elemento" : "Hoy tu elemento FUEGO está predominando en tu interior. Mucha energía en hacer, decir e ir por lo que deseas para ti. ",
      "encimaMedia" : "No te gustan los grises, quieres ir por la vida, haciendo, sintiendo con intensidad. No te gustan las medias tintas.",
      "altaMedia": `Ves la vida de una forma un tanto polarizada, o están conmigo o están contra mí. O está todo bien o está todo mal.`,
      "peligro": ""
    },
  ]

  const ejesEquilibrio = [
    {
      "nombre" : "Eje del Ser",
      "valor" : Math.abs(results[3].puntaje - results[4].puntaje),
      "clave" : `Para hacer un cambio, la vida te pide bucear en tu interior, que dediques un tiempo de introspección profunda en quién eres, qué quieres para tu vida, y cuáles son las verdaderas prioridades para ti, conectarte con tu interior, cerras por un rato las ventas que miran todo el tiempo hacia afuera para tornarte hacia tu Ser..`
    },
    {
      "nombre" : "Eje del Tener",
      "valor" : Math.abs(results[5].puntaje - results[2].puntaje),
      "clave" : `La vida te pide que observes qué significa verdaderamente lo material para ti, si es un medio para obtener seguridad o ser querido, nunca va a terminar de darte esa seguridad que anhelas, ya que lo material queda en este plano, y lo que verdaderamente buscas y anhelas es tu valor personal, sentirte en paz, amado, querido y en paz. Y eso se consigue con material espiritual.`
    },
    {
      "nombre" : "Eje de la Comunicación",
      "valor" : Math.abs(results[6].puntaje - results[1].puntaje),
      "clave" : `La comunicación es tu área donde puedes encontrar una llave perdida para abrir la puerta de tu transformación. Comunicarse es poder transmitir y poder recibir lo que el otro tiene para decirme. Observa ¿si te estás reprimiendo de decir, pedir o expresar algo que sientas por miedo al rechazo o bien si hablas de manera superficial evitando escuchar con el corazón a otros por miedo a sufrir?`
    },
    {
      "nombre" : "Eje de la Acción",
      "valor" : Math.abs(results[7].puntaje - results[0].puntaje),
      "clave" : `Para poder dar un salto en tu camino evolutivo, la vida te pide que concretes la acción. Que lleves a cabo lo que tienes que hacer para comenzar un cambio o bien para que las cosas lleguen a concretarse de forma correcta para tu bienestar.`
    },
    {
      "nombre" : "Eje del Estar",
      "valor" : Math.abs(results[8].puntaje),
      "clave" : `Tienes que aprender a parar, a delegar. Miedo a perder el control sino estás haciendo. Hay miedo a detenerte, y quizás antes de continuar la vida te pide que contemples en qué lugar te encuentras, qué quieres verdaderamente para tu vida, qué necesitas, qué necesitan los otros, etc.
      Para dar en el blanco, primero la flecha tiene que ir hacia atrás y detenerse unos minutos, para poder observar, poner foco y ver realmente donde está el verdadero objetivo.`
    }
  ]

  const recomendaciones = {
  
      "opcion": `Se recomienda poder tomarse más tiempo para el análisis, reflexión e introspección personal. Mirarse a sí mismo. Para poder contemplar observar lo que esté sucediendo en tu vida, tus necesidades, prioridades, y la situación general. Poder ver las cosas en su contexto real y objetivo.`,

      "opcion2": `Se recomienda poner más foco de atención en las propias necesidades y tomar una actitud pro activa para ir por ellas. Animarse a mostrarse más, en lo que hace, lo que le gusta y lo que necesita.`,

      "opcion3": `Se recomienda tomar en cuenta un poco más las necesidades de otros que están a tu alrededor, vínculos afectivos, obligaciones, pudiendo comprender cómo se ven afectados ellos a través de tus actos, ya sean activos o pasivos. Observar y tomar acción en función de proyectos o acciones para y por los demás.`

  }

  const yingYang = {
    "energiaMasculina": "En tu caso está predominando la Energía Masculina, que es activa, dadora, generadora, y eso puede provocar que de alguna forma comiences a sentirte cansado/a por tener que estar en un rol muy activo, de toma de decisiones, dadora y tu alma este anhelando relajarse, bajar las armas, confiar en que puede haber otro u otros que te sostengan, que hagan por ti, y estarás de todas formas a salvo, seguro y sintiéndote amado/a.",
    "energiaFemenina": "En tu caso está predominando la Energía Femenina, que es receptiva, pasiva, suave, contemplativa. El déficit de la energía masculina o Yang puede que esté causando en tu vida el postegar acciones que tengas que hacer, decisiones, ir por lo que quieres para manifestar tus sueños. Tiene que ver con tu autoridad interna, con tu validación y valoración personal. Quizás estes aguardando o asumiendo una actitud dependiente de acciones o decisiones externas y esto provoque una creencia o sentimiento de falta de autoestima y confianza en tu poder personal.",
    "energiaNeutra": "Tus niveles de Energia Masculina (activa, dadora, generadora) y Energia Femenina (receptiva, pasiva, suave, contemplativa) se encuentran en equilibrio."
  }

  const reaccionAnteProblemas = {
  
    "opcion1": `Tiendes a reaccionar de forma emocional ante los problemas externos y poco racional, lo que puede hacer que no sea la formas más adecuada, armónica y consistente para ello.`,

    "sugerencia1" : `Detenerse, reflexionar, observar y luego actuar para evitar caer en malas decisiones que te afecten a ti o a los que te rodean.`,

    "opcion2": `Tiendes a no afrontar el problema cuando está sucediente, queriendo evitar discusiones o tomar una decisión que pueda causarte un conflicto con otro, por miedo a que esa persona deje de quererte, se aleje o miedo a sufrir.`,

    "sugerencia2" : `Guardar debajo de la alfombra los problemas, solo hacen que sean cada día mas grande y generen mayor presión. Observar las consecuencias de no resolver ahora lo que está mal.`,

    "opcion3": `Tiendes a ser resolutivo cuando aparece un problema, poniendo el foco de atención en la objetividad y/o practicidad para poder así solucionar de forma eficiente, eficaz y concreta la situación.`,

    "sugerencia3" : `No desestimar las opiniones de otros y como estos se pueden ver afectados con la resolución o decisiones que tomes al respecto. Observar el posible impacto en los demás.`,

}

  ejesEquilibrio.sort((a,b) => b.valor - a.valor);
  ejesPolaridad.sort((a, b) => b.resultado - a.resultado);
  const predominantEje = ejesPolaridad[0];
  resultMutado.sort((a, b) => b.puntaje - a.puntaje);
  const highArea = resultMutado[0];
  const highArea2 =  resultMutado[1];
  const highArea3 =  resultMutado[2];
  const lowArea = resultMutado[8];
  const lowArea2 = resultMutado[7];
  const lowArea3 = resultMutado[6];
  const ying = results[7].puntaje + results[0].puntaje + results[1].puntaje + results[2].puntaje;
  const yang = results[3].puntaje + results[4].puntaje + results[5].puntaje + results[6].puntaje;
  const media = (highArea.puntaje + lowArea.puntaje)/2;
  const element = ejesPolaridad[0].elemento;
  

  
  useEffect(() => {
    const newInforme = {
      "firstArea" : "",
      "highFirstArea" : "",
      "secondArea" : "",
      "highSecondArea" : "",
      "thirdArea" : "",
      "highThirdArea" : "",
      "firstFear": lowArea.miedo,
      "secondFear": lowArea2.miedo,
      "thirdFear": lowArea3.miedo,
      "element" : element,
      "ejeMedia": "",
      "highEjeMedia": "",
      "ejePeligro": "",
      "ejeEquilibrio": ejesEquilibrio[0].clave,
      "comunicado" : "",
      "recomendacion" : "",
      "energiasYingYang" : "",
      "reaccion" : "",
      "sugerencia" : "",
      "peligro": ""
    }
    if ((Math.abs(highArea.puntaje - media)) > 0) {
      newInforme.firstArea = highArea.valoresBuenos; 
      if ((highArea.puntaje - media) >= 4) {
        newInforme.highFirstArea = highArea.valoresAltos;
      }
    } 
    if ((Math.abs(highArea2.puntaje - media)) > 0) {
      newInforme.secondArea = highArea2.valoresBuenos;
      if ((highArea2.puntaje - media) >= 4) {
        newInforme.highSecondArea = highArea2.valoresAltos;
      }
    }
    if ((Math.abs(highArea3.puntaje - media)) > 0) {
      newInforme.thirdArea = highArea3.valoresBuenos;
      if ((highArea3.puntaje - media) >= 4) {
        newInforme.highThirdArea = highArea3.valoresAltos;
      }
    }
    console.log((predominantEje.valor1 - media) > 1 && (predominantEje.valor1 - media) >= 2)
    if ( ((predominantEje.valor1 - media) > 1 && (predominantEje.valor1 - media) >= 2) && ((predominantEje.valor2 - media) > 1 && (predominantEje.valor2 - media) >= 2) ) {
      newInforme.ejeMedia = predominantEje.encimaMedia;
      if ((predominantEje.valor1 - media) >= 3 && (predominantEje.valor2 - media) >= 3) {
        newInforme.highEjeMedia = predominantEje.altaMedia;
        newInforme.peligro = predominantEje.peligro;
      }
    }
    if (lowArea.area.toString().concat(lowArea2.area.toString()).concat(lowArea3.area.toString()).includes("4" && "5" || "4" && "9" || "9" && "5")) {
      newInforme.recomendacion = recomendaciones.opcion;
    } else{
      if (lowArea.area.toString().concat(lowArea2.area.toString()).concat(lowArea3.area.toString()).includes("7" && "8" || "8" && "3" || "3" && "7")) {
        newInforme.recomendacion = recomendaciones.opcion2;
      } else {
        newInforme.recomendacion = recomendaciones.opcion3;
      }
    }
    if (ying > yang) {
      newInforme.energiasYingYang = yingYang.energiaMasculina;
    } else {
      if (ying < yang) {
        newInforme.energiasYingYang = yingYang.energiaFemenina;
      } else {
        newInforme.energiasYingYang = yingYang.energiaNeutra;
      }
    }
    if (highArea.area.toString().concat(highArea2.area.toString()).concat(highArea3.area.toString()).includes("8" && "6" || "8" && "4" || "6" && "4")) {
      newInforme.reaccion = reaccionAnteProblemas.opcion1;
      newInforme.sugerencia = reaccionAnteProblemas.sugerencia1;
    } else{
      if (highArea.area.toString().concat(highArea2.area.toString()).concat(highArea3.area.toString()).includes("7" && "9" || "7" && "2" || "9" && "2")) {
        newInforme.reaccion = reaccionAnteProblemas.opcion2;
        newInforme.sugerencia = reaccionAnteProblemas.sugerencia2;
      } else {
        newInforme.reaccion = reaccionAnteProblemas.opcion3;
        newInforme.sugerencia = reaccionAnteProblemas.sugerencia3;
      }
    }
    if (ejesEquilibrio[0].nombre === 'Eje de la Comunicación' &&  ejesPolaridad[0].nombre === 'ejeImagen' && ejesEquilibrio[3].nombre === 'Eje del Ser' ) {
      newInforme.comunicado = "Lo que se esta comunicando puede estar siendo superficial o tender a la apariencia y no hablando de temas realmente importantes o que necesitan ser hablados."
    }

    setInforme(newInforme)
  }, [])
  
  return (
    <div className={`w-[100%] h-[100%] flex flex-col ${flex}`}>
        <section className='w-[70%] flex flex-col gap-2'>
          <h1 className='text-[2rem] font-bold text-indigo-500 border-b-2 border-indigo-500'>Descripción de tu funcionamiento actual</h1>
          <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-indigo-500'>
            <p> {informe.firstArea}</p>
            <p> {informe.highFirstArea}</p>
            <p> {informe.secondArea}</p>
            <p> {informe.highSecondArea}</p>
            <p> {informe.thirdArea}</p>
            <p> {informe.highThirdArea}</p>
          </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2">
          <h2 className='text-[2rem] font-bold text-orange-500 border-b-2 border-orange-500 pb-2'>Miedos en este momento que te impiden avanzar</h2>
          <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-orange-500'>
            <p>Todos tenemos miedos, a veces no conscientes, que provocan un estancamiento en nuestro desarrollo personal.</p>
            <p>Poder hacerlos conscientes y trabajarlos es lo que nos empieza a mover del lugar en el que nos encontramos para llevarnos a un lugar de mayor plenitud.</p>
            <p>{informe.firstFear}</p>
            <p>{informe.secondFear}</p>
            <p>{informe.thirdFear}</p>
          </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2">
            <h3 className='text-[2rem] font-bold text-amber-500 border-b-2 border-amber-500 pb-2'>Area de tu Vida donde se está drenando tu Energía – Elemento predominante</h3>
            <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-amber-500'>
              <p>{informe.element}</p>
              <p>{informe.ejeMedia != "" ?  informe.ejeMedia : ""}</p>
              <p>{informe.highEjeMedia != "" ?  informe.highEjeMedia : ""}</p>
              <p>{informe.peligro != "" ? `Peligro: ${informe.peligro}` : ""}</p>
            </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2">
          <h4 className='text-[2rem] font-bold text-yellow-800 border-b-2 border-yellow-800 pb-2'>Clave para tu transformación</h4>
          <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-yellow-800'>
            <p>{informe.ejeEquilibrio}</p>
            <p>{informe.comunicado != '' ? informe.comunicado : ""}</p>
          </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2">
          <h4 className='text-2xl text-yellow-800'>Recomendaciones</h4>
          <div className='flex flex-col gap-6 text-lg'>
            <p>{informe.recomendacion}</p>
          </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2 ">
          <h5 className='text-[2rem] font-bold text-red-500 border-b-2 border-red-500 pb-2'>Integración de las Energías Masculinas y Femeninas</h5>
          <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-red-500'>
            <p>Los seres humanos estamos conformados de Energía Masculina (YANG) y Energía Femenina (YIN)
            Cada una de ellas es tan importante como la otra. Cuando hay un desbalance y una predomina vamos a sentir dificultad y carencia, por consecuencia falta de equilibrio y armonía interna lo que puede generarnos internamente sentimiendo de frustración, ira, y tristeza.
            </p>
            <p>{informe.energiasYingYang}</p>
          </div>
        </section>
        <section className="mt-6 w-[70%] flex flex-col text-lg gap-2">
          <h5 className='text-[2rem] font-bold text-pink-500 border-b-2 border-pink-500 pb-2'>Reacción ante los problemas</h5>
          <div className='flex flex-col gap-6 text-lg md:border-l-8 md:pl-2 md:border-pink-500'>
            <p>{informe.reaccion}</p>
            <p><span className='font-semibold'>Sugerencia:</span> {informe.sugerencia}</p>
          </div>
        </section>
    </div>
  )
}
