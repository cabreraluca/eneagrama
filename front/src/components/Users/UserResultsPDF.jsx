import React from 'react'
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";


export const UserResultsPDF = ({informe}) => {
  Font.register({family: 'Raleway', src:"https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap"})
  return (
    <Document>
        <Page size={"A4"}>   
            <Image src="https://i.postimg.cc/kG2rkbhb/wave-Result.png" alt="" />
            <View style={{width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", fontFamily: "Raleway"}}>
                <View style={{width: "75%"}}>
                  <Text style={{fontSize: "25px", color: "#2b2c91", fontWeight: 800, borderBottom: "2px solid #2b2c91" , paddingBottom: "3px"}}>Descripcion de comportamiento</Text>
                  <View style={{marginTop: "4px"}}>
                    <Text style={{fontSize: "14px", marginTop: "15px", lineHeight: "1.5px"}}>{informe.firstArea}</Text>
                    <Text style={{fontSize: "14px", marginTop: "15px", lineHeight: "1.5px"}}>{informe.highFirstArea}</Text>
                    <Text style={{fontSize: "14px", marginTop: "15px", lineHeight: "1.5px"}}>{informe.secondArea}</Text>
                    <Text style={{fontSize: "14px", marginTop: "15px", lineHeight: "1.5px"}}>{informe.highSecondArea}</Text>
                  </View>
                </View>
            </View>
            <View style={{ fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #F36A3E", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "75%"}}>
                <Text style={{fontSize: "20px", color: "#F36A3E", borderBottom: "2px solid #F36A3E" , paddingBottom: "3px"}}>Miedos en este momento que te impiden avanzar</Text>
                <Text style={{marginTop: "15px", lineHeight: "1.5px"}}>Todos tenemos miedos, a veces no conscientes, que provocan un estancamiento en nuestro desarrollo personal.</Text>
                <Text style={{marginTop: "15px", lineHeight: "1.5px"}}>Poder hacerlos conscientes y trabajarlos es lo que nos empieza a mover del lugar en el que nos encontramos para llevarnos a un lugar de mayor plenitud.</Text>
                <View>
                  <Text>{informe.firstFear}</Text>
                  <Text>{informe.secondFear}</Text>
                </View>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
                <View style={{width: "75%"}}>
                  <Text style={{fontSize: "20px"}}>Area de tu Vida donde se está drenando tu Energía – Elemento predominante</Text>
                  <Text>{informe.element}</Text>
                  <Text>{informe.ejeMedia != "" ?  informe.ejeMedia : ""}</Text>
                  <Text>{informe.highEjeMedia != "" ?  informe.ejeMedia : ""}</Text>
                  <Text>{informe.peligro != "" ? informe.ejeMedia: ""}</Text>
                </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "75%"}}>
                <Text style={{fontSize: "20px"}}>Clave para tu transformación</Text>
                <Text>{informe.ejeEquilibrio}</Text>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "75%"}}>
                <Text style={{fontSize: "20px"}}>Recomendaciones</Text>
                <Text>{informe.recomendacion}</Text>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "75%"}}>
                <Text style={{fontSize: "20px"}}>Integración de las Energías Masculinas y Femeninas</Text>
                <Text>Los seres humanos estamos conformados de Energía Masculina (YANG) y Energía Femenina (YIN)
                Cada una de ellas es tan importante como la otra. Cuando hay un desbalance y una predomina vamos a sentir dificultad y carencia, por consecuencia falta de equilibrio y armonía interna lo que puede generarnos internamente sentimiendo de frustración, ira, y tristeza.
                </Text>
                <Text>{informe.energiasYingYang}</Text>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
                <View style={{width: "75%"}}>
                  <Text style={{fontSize: "20px"}}>Reacción ante los problemas</Text>
                  <Text>{informe.reaccion}</Text>
                  <Text><span className='font-semibold'>Sugerencia:</span> {informe.sugerencia}</Text>
                </View>
            </View>
        </Page>
    </Document>
  )
}