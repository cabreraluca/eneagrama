import React, { useEffect, useState } from 'react'
import { Document, Page, Text, View } from "@react-pdf/renderer";


export const UserResultsPDF = ({result}) => {
    console.log(result)

  return (
    <Document>
        <Page size={"A4"}>
            <View style={{width: "100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Text>Area {result[0].area}: {result[0].puntaje}</Text>
                <Text>Area {result[1].area}: {result[1].puntaje}</Text>
                <Text>Area {result[2].area}: {result[2].puntaje}</Text>
                <Text>Area {result[3].area}: {result[3].puntaje}</Text>
                <Text>Area {result[4].area}: {result[4].puntaje}</Text>
                <Text>Area {result[5].area}: {result[5].puntaje}</Text>
                <Text>Area {result[6].area}: {result[6].puntaje}</Text>
            </View>
        </Page>
    </Document>
  )
}