import { createContext, useEffect, useState } from "react"

export const QuestionsContext = createContext()

export const QuestionsProvider = ({children}) =>{
    
    const [select, setSelect] = useState([]);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [indexAnswer, setIndexAnswer] = useState(0);
    const [informe , setInforme] = useState({});
    let resultadoQuest = [
        {
            "area": 1,
            "puntaje": 0,
            "valoresBuenos": `La persona tiene capacidad organizativa, autocontrol, acción para lograr que las cosas se realicen de forma ordenada, prolija, para obtener un resultado óptimo en los procesos.
            Tienes voluntad de acción propia, para ir en busca de la mejora continua, ya sea personal o profesionalmente.
            Se pone foco en los detalles, observador/a para detectar qué se puede ir mejorando para la evolución de los procesos, trabajos o momentos que estén transitando.
            Hay un anhelo de ayudar a otros a mejorar, y a sí mismos. 
            Eres una persona proactiva en donde pones el foco de atención o interés. Te gusta que las cosas sucedan de forma correcta según tu juicio de valor.
            Puede haber tendencia a la autocrítica, auto exigencia y lo mismo hacia otras personas, pudiendo correr el riesgo de caer en la insatisfacción por no sentir que las cosas o uno mismo es como cree internamente que deberían ser.
            `,
            "valoresAltos":`Hay una tendencia a la auto exigencia, auto crítica, rigidez interior y a su vez esto mismo volcarlo hacia fuera en los trabajos o en los vínculos, remarcando o señalando a otros las cosas que considera que no se están haciendo o siendo como tu ideal de perfección anhelan. Esto puede causar directa o indirectamente que haya vínculos que se tornen tensos, dado que otros pueden sentir que siempre se les marca el error y no se valora lo que está bien.
            Puedes estar teniendo Ira que te reprimes de exteriorizar, por tratar de sostener una imagen de impecabilidad y perfección y esto puede causar tensiones internas, falta de soltura a nivel corporal o mismo limitación interna para fluir con el devenir de las situaciones que se van presentando.`,
            "miedo": `Tienes miedo a quedar atrapado en rutinas u obligaciones diarias, que hacen que sientas que pierdes tu libertad expresarte, de ser, o hacer lo que quieres en cada momento. Hay falta de observación a los detalles y procesos que necesitas realizar para que los resultados sean óptimos para lo que estés realizando o quieras realizar y concretar.
            Para que algo se realice, se necesita pasar por un proceso, pasos a seguir consecutivos y correspondientes y esto hoy lo estas desestimando. Hay una carencia de anhelo de mejora, superación y auto crítica para avanzar de forma ordenada hacia una evolución.
            Miedo a perder la Libertad.
            `
        },
        {
            "area": 2,
            "puntaje": 0,
            "valoresBuenos": `Tienes una capacidad de comprender, acercarte y empatizar con otras personas. Tener una escucha activa pudiendo percibir y sentir lo que otros sienten, identificando sus necesidades para poder ayudarlos o acompañarlos para que se sientan queridos.
            Te gusta sentirte conectado a las personas que quieren o te interesan. Eres una persona amable, cariñosa y que disfruta de la compañía y vínculos afectivos, pudiendo abrirte a ellos sanamente.`,
            "valoresAltos": `Eres una persona que está poniendo mucho foco de atención en los otros, en ayudarlos, estar cerca, pero hay una búsqueda de obtener amor de su parte como contrapartida. Percibes con mucha facilidad lo que a otro le pasa, siente, incluso piensa… y eso te puede estar llevando a una pulsión por querer ayudar desde tu punto de vista, creyendo que tú sabes lo que otros necesitan y el dárselo te hace sentir un lugar de seguridad para confirmar y asegurar el amor de esas personas hacia ti. Puede haber una tendencia a sobre pasar ciertos límites de las individualidades de otros, ir en busca de ayudar sin que te lo pidan, y quizás haya afuera otras personas que prefieran la distancia emocional, y eso te repercute con un sentimiento profundo de rechazo.`,
            "miedo": `Miedo a abrir tu corazón, a sufrir, a sentir, a verte afectado y lastimado emocionalmente por otros. Esto puede hacer que otras personas te sientan lejos o cerrado/a, aún estando cerca físicamente.
            La comunicación con otras personas puede estar con dificultad en cuanto a estar receptivo, escuchar y comprender lo que otros tienen para decirte, en función de lo que sientes o les pasa. Esto muchas veces cuesta porque hay miedo a quizá escuchar lo que otros tienen para decirte y pueda doler o verte implicado en la necesidad de responder activamente a esa situación.`
        },
        {
            "area": 3,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona con capacidad de accionar para lograr lo que te propones. Tienes una gran motivación para ir por las metas, concretar objetivos y así obtener el éxito esperado en el ámbito que te lo propongas.
            Puedes comunicarle al mundo con facilidad tus dones, tus desarrollos profesionales o personales, tus proyectos, etc., y de esa forma cautivar la atención externa para promoverte e ir subiendo en la escalera del logro personal.
            Te gusta verte bien, mostrar una imagen adecuada para el perfil de lugar o personas en las que te mueves, para ello resaltas siempre tus virtudes para que ellas sean foco de atención para una posible contratación de tus servicios o productos.
            Tienes gran capacidad de manifestar tus deseos materiales y profesionales.`,
            "valoresAltos": `Tienes una inquietud muy grande para lograr concretar tus metas, y aún cuando las alcanzas, necesitas fijar nuevos objetivos que te mantengan en la carrera al éxito. Para ti no estar haciendo, produciendo, logrando es una pérdida de tiempo. El foco de atención en querer triunfar en el aspecto de tu vida que te hayas propuesto puede hacerte olvidar incluso lo que verdaderamente necesitas o sientes, y aún más, lo que sientan o necesitan las personas que están a tu alrededor, quizás sobrepasándolos con tus decisiones o acciones.
            Hay una obsesión con la imagen que quieres proyectar al mundo, de exitoso/a en cualquier ámbito, y así caer en una rueda que gira y gira sin parar.
            Hay una creencia interna de que si no hago, no logro, y si no logro, no valgo.
            El mundo me va a dar valor personal en función de mis logros personales y no por quién soy en realidad, fuera del rol que estoy ejecutando.`,
            "miedo": `Hay miedo a mostrarse, a salir al mundo a contar lo que uno hace, tus dones, tus trabajos, tus cualidades. Miedo a ser exitoso y triunfar. Preguntarte: ¿Qué beneficio (no consciente) me trae seguir en este lugar? ¿qué pasaría si soy exitoso? ¿a quién no quiero que me mire o a quién tengo miedo de opacar?
            Hay falta de motivación para el propio desarrollo profesional, laboral o económico. Falta de confianza en que uno puede ser bueno en lo que hace y atraer clientes, pedidos, contrataciones en el área en que se esté desarrollando.
            Miedo a ser o parecer superficial.`
        },
        {
            "area": 4,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona altamente creativa, innovadora quizás también. Probablemente te atraiga mucho alguna rama artística donde puedes canalizar y expresar toda esa imaginación e inspiración que brota de tu interior.
            Eres una persona que está conectado/a profundamente con tus sentimientos, con tus deseos y con las cosas que te apasionan o te gustaría poder hacer. Te gusta expresar lo que sientes y que la o las personas que te importan comprendan lo que sientes. Tienes un gran desarrollo de tu área creativa, en cualquier área que sea, puedes impactar a través de tu originalidad.
            Disfrutas de la compañía de otros, pero también necesitas y anhelas tus momentos de intimidad contigo mismo/a, de caminar en soledad, de experimentar un momento de disfrute personal.
            Te gustaría que otros puedan percibir que eres especial, que tienes algo único para darle al mundo en el aspecto que sea.`,
            "valoresAltos": `Eres una persona muy sensible, perceptiva, susceptible también a las reacciones o miradas externas. Tienes una gran necesidad de expresarte, de que otros comprendan lo que sientes o te está sucediendo, y quizás puedas sentirte frustrado/a por ellos, ya que los demás nunca pueden estar en nuestro interior sintiendo nuestras emociones o estados de ánimo. Esto te puede llevar a un sentimiento de no encajar, de ser diferente a los demás y aún más, realmente no querer sentirte parte de la generalidad de las personas.
            Puedes tener fluctuaciones en estos estados, quizás algunos días te sientas caído/a, triste, con baja autoestima, con una pulsión a aislarte y quedar atrapado en tus emociones, quedando atrapado o ensimismado en ellas.
            Necesitas tus espacios para poder canalizar todo esto que sientes y quizás poder plasmarlos a través de algún acto creativo.
            Puedes tener tendencia a caer en el victimismo, sentimiento de carencia y melodrama, algo que también puede afectar a los vínculos afectivos más cercanos ya que querrán de alguna manera ayudarte pero puedes caer en un auto boicot. La pregunta a hacerse sería: ¿Qué beneficio me trae el permanecer en estado de víctima?`,
            "miedo": `Miedo a verse a uno mismo. Ver tus necesidades, tus carencias, lo que duele, lo que sientes que te falta.
            Hay dificultad para el auto cuidado, el priorizarse, el pedir lo que uno necesita o le gustaría que otros le dieran. Falta de amor propio.
            Quizás sientas que no sabes bien cuál es tu pasión, eso que te moviliza desde lo más profundo, eso que te hace brillar, y estés solamente haciéndole caso a tu Ego que te indica y marca qué es lo que deberías hacer.`
        },
        {
            "area": 5,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona con gran capacidad de observación de la realidad, de lo que sucede a tu alrededor de forma objetiva y racional. Eres reflexivo/a, introvertido/a. Te interesa profundizar en los temas que te interesan, anhelas la profundidad en el conocimiento. Puedes ser una persona con gran capacidad para explicar con claridad temas de los cuales hayas profundizado previamente.
            Necesitas tiempo en soledad para preservarte, resguardar tu energía y dedicarte a estos puntos que son de gran interés para ti.
            Puedes desapegarte de las emociones fácilmente, con lo bueno y lo malo que esto trae. Como positivo, tienes la posibilidad de ver las situaciones que te rodean con total objetividad y en contrapartida, algunas personas pueden sentirte aislado/a o retraído socialmente.`,
            "valoresAltos": `Tiendes a aislarte socialmente, a estar en soledad y con mucho análisis mental, algo que por un lado te hace ver situaciones con claridad, pero por otro te encierras en tu mente, analizando y pensando situaciones, lo que puede producirte un enojo pasivo. Es decir, quedarte retraído y cargando con esos pensamientos que te causan mucha presión y ansiedad.
            Tu anhelo de profundizar acerca de uno o más temas, ya sean personales o profesionales, te puede estar causando que te quedes en la cómoda posición de soledad, para no tener que enfrentarte al mundo, a salir a accionar más que dar vueltas en el análisis una y otra vez.
            Puede que haya personas a tu alrededor que te sientan poco cerca emocionalmente, y de alguna u otra forma les cueste llegar a ti.`,
            "miedo": `Hay miedo a ver algo de tu vida, de tu realidad (personal, económica, vincular, laboral, etc.) que no está bien, duele y necesita ser enfrentada.
            Dificultad para poder discernir entre lo urgente y lo importante. Hoy la vida quizá te esté pidiendo un poco de introspección, análisis, reflexión profunda sobre algunos temas importantes para tu vida, y para ello necesitas poder alejarte emocionalmente de personas o situaciones que te estén causando apego o miedo a la soledad.`
        },
        {
            "area": 6,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona responsable, que le gusta cumplir con y para los demás. Ser una persona leal, en la que otros pueden confiar, sabiendo que siempre vas a estar para colaborar de forma incondicional.
            Te interesa mucho el bienestar del grupo y el personal, tratando de actuar de forma precavida ante las diferentes situaciones. Tienes una mente muy activa que en ocasiones puede confundirte, marearte y sobrecargarte de pensamientos abrumadores y dudas.
            De alguna forma buscas validar las decisiones que tienes que tomar, a través de consultar a otros y buscar el consenso general. Esto puede ser por la falta de confianza en tus propias decisiones por miedo a que puedan causar algún perjuicio en caso de no ser las adecuadas.`,
            "valoresAltos": `Estás teniendo mucha actividad mental, muchos pensamientos que van y vienen. Preocupaciones por cosas que podrían llegar a suceder que te abruman, te estresan y no te dejan descansar verdaderamente, pudiendo causarte niveles altos de ansiedad, tensión, etc.
            Tienes miedo quizá de no hacer las cosas bien, de tomar decisiones y en tu cabeza puedes estar escuchando diferentes voces que opinan en diferentes direcciones y te hacen paralizar a causa de las dudas e incertidumbre que te provocan.
            Eres una persona muy inteligente y valiosa, pero no puedes verlo con claridad, es como si tuvieras una nube que no te deja ver la luz con nitidez. Puedes ver las capacidades de otros, pero no confías plenamente en las tuyas.
            Tienes una tendencia a desconfiar de las personas, de las situaciones, de ti mismo/a y del devenir de la vida. Hay una necesidad de controlar y estar como un radar, tratando de anticiparse a los posibles sucesos terribles que tu imaginación te trae y quizás ninguno de ellos ocurra realmente. Pero esta preocupación constante puede abrumarte y consumirte tu energía vital.`,
            "miedo": `Miedo a perder tu libertad, por quedar atrapado/a, comprometido/a a responsabilidades para con otros. Hay una dificultad en pensar en forma colectiva, contemplando qué es lo mejor para el grupo (familia, trabajo, amigos, etc.), buscando un consenso en la toma de decisiones.
            Se necesita poner el foco en las necesidades de los otros, quizás eso implique cumplir con ciertas rutinas o hacerse cargo de funciones que estás queriendo evitar por sentir que van en dirección contraria o son un obstáculo para tus decisiones e intenciones personales.`
        },
        {
            "area": 7,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona inquieta, te atraen una gran diversidad de actividades, personas, hobbies, etc.
            Tienes una mente muy rápida y curiosa, te gusta planificar actividades y ver el potencial que la vida trae.
            Tienes una mirada positiva ante la vida, y te gusta acercarte a las personas, sociabilizar. Tienes una gran capacidad de comunicación, a través del entusiasmo que brota de tu interior, anhelas transmitirlo a otras personas para que se animen a realizar sus sueños o proyectos. Te sale con facilidad conectar ideas, personas, vinculas a otros, muchas veces terminas siendo como un puente para otros.
            Vas en búsqueda del disfrute, del placer, a través de actividades, comidas, personas o lo que te atraiga para mantenerte en estado de entusiasmo. No te gusta sentir control ni presión de otros. Anhelas la libertad para poder hacer lo que quieres en cada momento.`,
            "valoresAltos": `Eres una persona curiosa e inquieta, te atraen una gran diversidad de actividades, personas, hobbies, etc. Optas siempre por una mirada positiva, entusiasta las situaciones que presenta la vida, pero puedes estar tendiendo a ser poco realista con esta actitud. Quizá haya personas que quieran profundizar en temas que son difíciles o dolorosos, pero esto es algo que evitas. Conectar con el dolor, el sufrimiento es algo que te resulta duro, y quizás inconscientemente optes por una mirada un tanto infantil o suavizada de las cosas. Esto puede provocar que quieras “escaparte” de posibles conflictos o problemas, buscando rápidamente una salida que te provoque de nuevo conectarte con el placer, pero quizá a largo plazo esto haga que se te vuelvan a repetir las mismas dificultades en diferentes escenarios.`,
            "miedo": `Hay miedo a disfrutar, a vivir la vida, a experimentarla. Falta de alegría y entusiasmo para encarar y hacer cosas. Quizá esté habiendo poca sociabilización para los tiempos libres, o desde un enfoque más relajado e inocente.
            Sentimiento de irresponsabilidad por dejar de trabajar u ocuparse de otros o de obligaciones y eso esté causando cierta tristeza, o tensión en tu interior.`
        },
        {
            "area": 8,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona muy proactiva, determinada. Tienes mucha confianza en ir por las cosas que quieres y te propones, con auto determinación, y toma de decisiones.
            Tienes capacidad de acción y liderazgo, algo que hace que la gente te vea quizás como una persona que se impone y de mucho carácter.
            Te gusta tener control de lo que sucede a tu alrededor y sentir que puedes confiar en las personas que te rodean. Te gusta sentirte fuerte a través de lo que haces, tener autoridad ante otros y ser respetado.
            Te molesta mucho la traición y la mentira, algo que puede hacerte enojar en caso de que suceda.`,
            "valoresAltos": `Eres una persona decidida, proactiva, luchadora, determinada. Te gusta sentirte fuerte y con poder a través de las cosas que vas haciendo. Tener tu autonomía y que nada ni nadie se interponga en tu camino para realizar las cosas.
            Puedes verte en situaciones donde sientes mucha ira y eso provoque que digas o hagas cosas que pueden lastimar a otros. Puede pasar que quieras imponer tu verdad y desestimes opiniones y el sentir de otras personas, sobre pasándolos muchas veces de forma quizá un poco autoritaria.
            Te genera mucho enojo ver que otros no hagan las cosas, que se muestren débiles o en posición de víctimas. También si sientes que hay personas que te mienten o traicionan, por lo que probablemente caigas en actitudes de control e intimidación hacia otros.
            Sientes que tienes la verdad y los actos de injusticia te generan mucha ira. Pero siempre hay que parar y reflexionar, ya que no existe una única verdad, sino lo que representa para cada uno de nosotros.`,
            "miedo": `Miedo a tomar decisiones, a decir “NO”, a poner límites a personas o a situaciones que pudieras estar atravesando. Miedo a confrontar, a discutir por aquellas cosas que no estás de acuerdo o te molestan, por temor a quedar como una mala persona o no ser querido/a y sentirte rechazado/a.
            Hay falta de autoridad interna, de incluso ponerte límites a ti mismo para terminar o comenzar con ciertas acciones que tienes que emprender.`
        },
        {
            "area": 9,
            "puntaje": 0,
            "valoresBuenos": `Eres una persona con capacidad para poder parar, descansar, contemplar y reflexionar.
            Te gusta tener tus momentos de tranquilidad, sentirte en armonía, con tu espacio personal donde poder estar cómodo/a. Evitas confrontar con otros, no te gusta entrar en conflictos y eliges de alguna u otra forma la paz antes de imponer alguna postura.
            Quieres que las personas a tu alrededor se lleven bien y que tu entorno sea apacible. Te gusta ir a tus tiempos para realizar las diferentes actividades y no sentirte presionado/a para ello.
            Puedes comprender los diferentes puntos de vista y opiniones, y eso te hace ser una persona con gran capacidad de escuchar y estar receptivo/a a los otros.`,
            "valoresAltos": `Tiendes a ser una persona tranquila, que trata de tener una mirada positiva y relajada ante las situaciones. No te gustan los conflictos y discusiones y tratas de evitarlos a toda costa, ya que te causa mucha incomodidad tener que estar en lugares donde haya situaciones tensas y a su vez puede que le tengas miedo a confrontar, incluso a costa de dar tu verdadera opinión o manifestar desacuerdo, y esto puede provocar que te veas dejado a un lado por ti mismo/a, sobre adaptándote a decisiones de otros.
            Puedes caer en situaciones pasivo/agresivas, donde elijes alejarte, callar o bien mantenerte en una situación imparcial y esto cause malestar a personas con las que te vinculas.
            Prefieres mantener las situaciones en una tensa calma, con tal de no discutir, es como querer mantener el mar sin olas, y esto te puede causar tensión y un rumiar interno.`,
            "miedo": `Hay miedo a parar, descansar, a no estar en acción, trabajando, ocupándote de cosas, etc.
            Puede estar habiendo tensión, falta de calma y paz interior. Dificultad para poder escuchar y ver diferentes puntos de vista relacionados con situaciones o personas.
            Te puede estar resultando difícil estar en el presente, conectado en cada momento, puede que tiendas a irte al pasado o al futuro, y eso te quite tranquilidad mental.`
        }
    ];
    
    useEffect(() => {
      const storageResults = JSON.parse(localStorage.getItem("storageResults")) || []; 
      setSelect(storageResults);
    }, [])
    

    return (
        <QuestionsContext.Provider 
        value={{
            select, 
            setSelect, 
            resultadoQuest, 
            questionsAnswered, 
            setQuestionsAnswered, 
            indexAnswer, 
            setIndexAnswer,
            informe,
            setInforme}}>
            {children}
        </QuestionsContext.Provider>
    )

}