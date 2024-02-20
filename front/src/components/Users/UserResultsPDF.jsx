import React from 'react'
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import myFont from '../../assets/fonts/Raleway-Regular.ttf';
import myFontBold from '../../assets/fonts/Raleway-Bold.ttf'


export const UserResultsPDF = ({informe , userName}) => {
  const {firstname, lastname} = userName;
  Font.register({family: 'Raleway', src: myFont});
  Font.register({family: 'RalewayBold', src: myFontBold});
  return (
    <Document>
        <Page size={"A4"} style={{fontFamily: "Raleway"}}>   
            <Image src="https://i.postimg.cc/JzTYvz0L/wave.png" alt="" />
            <View style={{width: "95%", display: "flex", alignItems: "flex-end"}}>
              <Text style={{color: "#2b2c91", fontFamily:"RalewayBold"}}>{firstname} {lastname}</Text>
            </View>
            <View style={{width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #2b2c91", paddingLeft: "5px", marginTop: "25px"}}>
                <View style={{width: "83%", lineHeight: "1.5px", fontSize: "14px" }}>
                  <Text style={{fontSize: "25px", color: "#2b2c91", fontFamily:"RalewayBold", borderBottom: "2px solid #2b2c91" , paddingBottom: "3px"}}>Descripción de comportamiento</Text>
                  <View style={{marginTop: "4px"}}>
                    <Text style={{marginTop: "15px"}}>{informe.firstArea}</Text>
                    <Text style={{marginTop: "15px"}}>{informe.highFirstArea}</Text>
                    <Text style={{marginTop: "15px"}}>{informe.secondArea}</Text>
                    <Text style={{marginTop: "15px"}}>{informe.highSecondArea}</Text>
                    <Text style={{marginTop: "15px"}}>{informe.thirdArea}</Text>
                    <Text style={{marginTop: "15px"}}>{informe.highThirdArea}</Text>
                  </View>
                </View>
            </View>
            <View style={{ fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #F36A3E", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "83%", lineHeight: "1.5px"}}>
                <Text style={{fontSize: "25px", color: "#F36A3E",fontFamily:"RalewayBold", borderBottom: "2px solid #F36A3E" , paddingBottom: "3px"}}>Miedos en este momento que te impiden avanzar</Text>
                <Text style={{marginTop: "15px"}}>Todos tenemos miedos, a veces no conscientes, que provocan un estancamiento en nuestro desarrollo personal.</Text>
                <Text style={{marginTop: "15px"}}>Poder hacerlos conscientes y trabajarlos es lo que nos empieza a mover del lugar en el que nos encontramos para llevarnos a un lugar de mayor plenitud.</Text>
                <View style={{lineHeight: "1.5px"}}>
                  <Text>{informe.firstFear}</Text>
                  <Text>{informe.secondFear}</Text>
                  <Text>{informe.thirdFear}</Text>
                </View>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #FFC107", paddingLeft: "5px", marginTop: "25px"}}>
                <View style={{width: "83%", lineHeight: "1.5px" }}>
                  <Text style={{fontSize: "25px", fontFamily:"RalewayBold", color: "#FFC107", borderBottom: "2px solid #FFC107"}}>Area de tu Vida donde se está drenando tu Energía – Elemento predominante</Text>
                  <View style={{marginTop: "15px"}}>
                    <Text>{informe.element}</Text>
                    <Text>{informe.ejeMedia != "" ?  informe.ejeMedia : ""}</Text>
                    <Text>{informe.highEjeMedia != "" ?  informe.highEjeMedia : ""}</Text>
                    <Text>{informe.peligro != "" ? informe.peligro: ""}</Text>
                  </View>
                </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #F9A825", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "83%", lineHeight: "1.5px"}}>
                <Text style={{fontSize: "25px", fontFamily:"RalewayBold", color: "#F9A825", borderBottom: "2px solid #F9A825"}}>Clave para tu transformación</Text>
                <Text style={{marginTop: "15px"}}>{informe.ejeEquilibrio}</Text>
              </View>
              <View style={{width: "83%", lineHeight: "1.5px"}}>
                <Text style={{fontSize: "20px", color: "#F9A825", marginTop: "15px"}}>Recomendaciones</Text>
                <Text style={{marginTop: "15px"}}>{informe.recomendacion}</Text>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #F44336", paddingLeft: "5px", marginTop: "25px"}}>
              <View style={{width: "83%", lineHeight: "1.5px"}}>
                <Text style={{fontSize: "25px", fontFamily:"RalewayBold", color: "#F44336", borderBottom: "2px solid #F44336"}}>Integración de las Energías Masculinas y Femeninas</Text>
                <View style={{marginTop: "15px"}}>
                  <Text>Los seres humanos estamos conformados de Energía Masculina (YANG) y Energía Femenina (YIN)
                  Cada una de ellas es tan importante como la otra. Cuando hay un desbalance y una predomina vamos a sentir dificultad y carencia, por consecuencia falta de equilibrio y armonía interna lo que puede generarnos internamente sentimiendo de frustración, ira, y tristeza.
                  </Text>
                  <Text>{informe.energiasYingYang}</Text>
                </View>
              </View>
            </View>
            <View style={{fontSize: "14px", width: "100%", display: "flex", alignItems: "center", borderLeft: "8px solid #E91E63", paddingLeft: "5px", marginTop: "25px"}}>
                <View style={{width: "83%", lineHeight: "1.5px"}}>
                  <Text style={{fontSize: "25px", fontFamily:"RalewayBold", color: "#E91E63", borderBottom: "2px solid #E91E63"}}>Reacción ante los problemas</Text>
                  <View style={{marginTop: "15px"}}>
                    <Text>{informe.reaccion}</Text>
                    <Text><span style={{fontFamily:"RalewayBold"}}>Sugerencia:</span> {informe.sugerencia}</Text>
                  </View>
                </View>
            </View>
            <View style={{width: "100%", display:"flex", alignItems: "center", marginTop: "50px"}}>
                <View style={{width: "100%", display: "flex",flexDirection: "row" , justifyContent: "space-around" , alignItems: "center"}}>
                  <Text style={{fontSize: "15px", color: "#2b2c91", fontFamily: 'RalewayBold'}}>www.mapapersonal.com</Text>
                  <Image style={{height: "60px"}} src="https://i.postimg.cc/QMHncKDz/logo-mapa-personal.png"/>
                </View>
            </View>
        </Page>
    </Document>
  )
}