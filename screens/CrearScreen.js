import { Text, StyleSheet, View,TextInput } from 'react-native'
import React, { useState } from 'react'


export default function CrearScreen () {
const[nombre, setNombre]= useState('ingresa tu nombre');
const[correo, setCorreo]= useState('ingresa un correo o telefono');
const[telelefoni, setTelefono] = useState('ingresa tu numero');
const[clave, setClave] = useState('ingresa una clave');
    return (
       
  <View style={styles.background}>

    <View style={styles.header}></View>
    <View  style={styles.azul}> 
        <Text style={styles.titulo}>Crear cuenta nueva</Text>
    </View>
    <Text style={styles.subtitulos}>Ingresa tu nombre</Text>
                    <TextInput style={styles.entrada}
                    placeholder='nombre'
                    onChangeText={(valor)=>setNombre(valor)}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                  
                    <Text style={styles.subtitulos}>Ingresa tu correo</Text>
                    <TextInput style={styles.entrada}
                    placeholder='correo'
                    onChangeText={(pas)=>setCorreo(pas)}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                    <Text style={styles.subtitulos}>Ingresa tu telefono</Text>
                    <TextInput style={styles.entrada}
                    placeholder='telefono'
                    onChangeText={(corr)=>setTelefono(corr)}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                  
                    <Text style={styles.subtitulos}>Ingresa tu clave</Text>
                    <TextInput style={styles.entrada}
                    placeholder='clave'
                    onChangeText={(pas)=>setClave(pas)}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                    






  </View>
    )
  
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        width:'100%',
        height:'100%',
        resizeMode:'center',
        justifyContent:'start',
        alignItems:'center',
        backgroundColor:'#7DA0CA',
      

    },
    header:{
        backgroundColor:"#ffffffff",
        width:'100%',
        height:80,
        alignSelf:'flex-start',
        

    },
    azul:{
        backgroundColor:"#052659",
        width:'100%',
        height:80,
        marginTop:'25%',
        alignItems:'center',
        justifyContent:'center'
        
    },
    entrada:{
        borderWidth:1,
        borderColor:'transparent',
        padding:8,
        margin:15,
        width:300,
        height:50,
        backgroundColor:'#052659',
        borderRadius:10,
        color:'white',
    },
        subtitulos:{
        fontFamily:'sans-serif',
        fontSize:20,
        color :'#052659',



    },
    titulo:{
        color:'white',
        fontSize:'25',
        alignItems:'center',
        justifyContent:'center'
        
    }
  
})