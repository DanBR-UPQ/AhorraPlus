import { Text, StyleSheet, View,Image,TextInput } from 'react-native'
import React, { Component, useState } from 'react'



export default function HomeScreen () {
const[saldo,setSaldo]=useState("500")
    return (
     <View style={styles.fondo}>
      <View style={styles.cuadroArriba}>
        
    <Image
    source={require('../assets/usuario.png')}
    styles={styles.avatar}
    ></Image>
    <Text style={styles.letra}>Usuario</Text>
    <Text style={styles.total}>Total: ${saldo}</Text>


  <View style={styles.botonAgregar}>
    <Text style={styles.textoBoton}>+ Agregar Transacción</Text>
  </View>

     </View>
     <View style={styles.pagos}>
        
        <View style={styles.izquierda}>
            <Text style={styles.concepto}> Hogar</Text>
         <Text style={styles.tipo}> pago de luz</Text>
         </View>
         <View>
         <Text style={styles.monto}> $500</Text>
         </View>
     </View>
    </View>
    )

}

const styles = StyleSheet.create({
    cuadroArriba:{
        backgroundColor:'#5483b3',
        width:'100%',
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        

    },
    fondo:{
         backgroundColor:'#052659',
        width:'100%',
        height:'100%',
        flex:1,


    },
    avatar:{
        justifyContent:'center',
        width:'25%',
        heoght:'25%',

    },
    letra:{
        fontSize:'30',
       color:'white'
    },
    pagos:{
        width:"300",
        height:50,
        backgroundColor:'#3aa0b3ff',
        alignSelf:'center',
        borderRadius:10,
        marginTop:20,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15
        

    },
    concepto:{
        marginHorizontal:15,
        marginBottom:5,
        margintop:10,
        color:'#052659',
        fontSize:15,
    },
    tipo:{
        alignSelf:"center",
   
        color:'grey',
        fontSize:15,
    },
    izquierda:{
        flexDirection:"column"
    },
    total: {
  fontSize: 18,
  color: 'white',
  marginTop: 10,
  marginBottom: 10,
  alignSelf:'flex-start',
  marginLeft:30,
},
botonAgregar: {
  backgroundColor: '#3aa0b3', 
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'white',
  alignSelf:'flex-start',
  marginLeft:30,
},
textoBoton: {
  color: 'white',
  fontSize: 16,
  
},
   
})