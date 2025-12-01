import { Text, StyleSheet, View,Image,TextInput, ScrollView } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { TransaccionController } from '../controllers/TransaccionController'
import { PresupuestoController } from '../controllers/PresupuestoController'



export default function HomeScreen () {
const[saldo,setSaldo]=useState("500")
const [alertas, setAlertas] = useState([])

const categorias = [
  "Servicios",
  "Entretenimiento",
  "Despensa",
  "Transporte",
  "Otro",
  "Salario",
  "Inversiones",
  "Regalos"
]

useEffect(() => {
  verificarPresupuestos()
}, [])

const verificarPresupuestos = async () => {
  try {
    const transaccionController = new TransaccionController()
    const presupuestoController = new PresupuestoController()
    await transaccionController.initialize()
    await presupuestoController.initialize()
    const transacciones = await transaccionController.obtenerTransacciones()
    const presupuestos = await presupuestoController.obtenerPresupuestos()
    const alertasEncontradas = []
    // DATOS DE PRUEBA 
    /* const transacciones = [
      { categoria: "Servicios", monto: 100, tipo: "Gasto" },
      { categoria: "Servicios", monto: 500, tipo: "Gasto" },
      { categoria: "Entretenimiento", monto: 300, tipo: "Gasto" },
    ]

    const presupuestos = [
      { categoria: "Servicios", monto: 1200 },
      { categoria: "Entretenimiento", monto: 500 },
    ] */


    categorias.forEach(categoria => {
      let presupuesto = presupuestos.find(p => p.categoria === categoria)
      
      if (!presupuesto) {
        presupuesto = { categoria, monto: 0 }
      }

      const totalGastos = transacciones
        .filter(t => t.categoria === categoria && t.tipo === "Gasto")
        .reduce((sum, t) => sum + Number(t.monto), 0)

      const excedente = totalGastos - presupuesto.monto

      if (excedente > 0) {
        alertasEncontradas.push({
          categoria,
          excedente: excedente.toFixed(2)
        })
      }
    })

    setAlertas(alertasEncontradas)

  } catch (error) {
    console.error('Error al verificar presupuestos:', error)
  }
}

    return (
     <ScrollView style={styles.fondo}>
      <View style={styles.cuadroArriba}>
        
    <Image
    source={require('../assets/usuario.png')}
    styles={styles.avatar}
    ></Image>
    <Text style={styles.letra}>Usuario</Text>
    </View> 

  {/* <View style={styles.botonAgregar}>
    <Text style={styles.textoBoton}>+ Agregar Transacción</Text>
  </View>

     </View>
     <View style={styles.pagos}>
        
        <View style={styles.izquierda}>
            <Text style={styles.concepto}> Hogar</Text>
         <Text style={styles.tipo}> pago de luz</Text>
         </View>
         <View style={styles.derecha}>
    <Text style={styles.monto}>$500</Text>
    <Image 
      source={require('../assets/lapiz.png')} 
      style={styles.lapiz} 
    />
  </View> */}




       {/* ZONA DE ALERTAS (PROCUREN Q QUEDE HASTA ABAJO) */}


     <View style={styles.seccionAlertas}>
       <Text style={styles.tituloAlertas}>Alertas de Presupuesto</Text>
       
       {alertas.length === 0 ? (
         <View>
           <Text style={styles.mensajeExito}>
             Todos tus gastos están dentro de los presupuestos
           </Text>
         </View>
       ) : (
         alertas.map((alerta, index) => (
           <View key={index} >
               <Text style={styles.textoAlerta}>
                 - La categoría{' '}
                 <Text style={styles.categoriaDestacada}>{alerta.categoria}</Text>
                 {' '}está{' '}
                 <Text style={styles.montoDestacado}>${alerta.excedente}</Text>
                 {' '}sobre su presupuesto
               </Text>
           </View>
         ))
       )}
     </View>
    </ScrollView>
    )

}

const styles = StyleSheet.create({
    cuadroArriba:{
        backgroundColor:'#5483b3',
        width:'100%',
        height:'70%',
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
        fontSize:30,
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
derecha:{
    flexDirection:"row",
    alignItems:"center",
},lapiz: {
  width: 18,              
  height: 18,
  marginLeft: 5,         
  resizeMode: 'contain',  
},




seccionAlertas: {
  marginTop: 30,
  paddingHorizontal: 20,
  paddingBottom: 30,
},
tituloAlertas: {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
  marginBottom: 15,
  textAlign: 'center',
},

iconoExito: {
  fontSize: 40,
  color: 'white',
  marginBottom: 8,
},
mensajeExito: {
  fontSize: 15,
  color: 'white',
  textAlign: 'center',
},
iconoAlerta: {
  fontSize: 28,
  marginRight: 12,
},
contenidoAlerta: {
  flex: 1,
},
textoAlerta: {
  fontSize: 14,
  color: 'white',
  lineHeight: 20,
},
categoriaDestacada: {
  /* fontWeight: 'bold', */
  /* color: '#ffd700', */
},
montoDestacado: {
  fontWeight: 'bold',
  color: '#ff6b6b',
  fontSize: 16,
},

   
})