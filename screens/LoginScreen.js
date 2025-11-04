import { Text, StyleSheet, View, ImageBackground,TextInput, Image, Button} from 'react-native'
import React, { useState } from 'react'





export default function LoginScreen () {
const[correo, setCorreo]= useState('ingresa un correo o telefono');
const[clave, setClave] = useState('ingresa una clave');
    return (
        <View style={styles.background}>

       <Text style={styles.titulos}> Bienvenido</Text>
         <Image
    source={require('../assets/usuario.png')} 
    style={styles.avatar}
  />
        <View style={styles.formulario}>
            
            <Text style={styles.subtitulos}>Ingresa tu correo</Text>
            <TextInput style={styles.entrada}
            placeholder='correo'
            onChangeText={(valor)=>setCorreo(valor)}
            placeholderTextColor="rgba(255,255,255,0.7)"
            />
          
            <Text style={styles.subtitulos}>Ingresa tu contraseña</Text>
            <TextInput style={styles.entrada}
            placeholder='contraseña'
            onChangeText={(pas)=>setClave(pas)}
            placeholderTextColor="rgba(255,255,255,0.7)"
            />
            <Button title='iniciar sesion' style={styles.boton}></Button>
            <Button title='Registrarse' style={styles.boton}></Button>

        </View>

   
       </View>
    )
  
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#052659'
    },
    formulario:{
        width:'80%',
       // backgroundColor:'#fbf5f5d7',
        alignItems:'center',
        height:'40%'
        
    

    },
    titulos:{
        fontFamily:'Times New Roman',
        fontSize:35,
        color:'white'



    },
    entrada:{
        borderWidth:1,
        borderColor:'transparent',
        padding:8,
        margin:22,
        width:200,
        backgroundColor:'#f3e3e3e2',
        borderRadius:10,
        color:'white',
    },
    avatar:{
        borderColor:'white',
        width:'25%',
        height:'25%',

    },
      subtitulos:{
        fontFamily:'sans-serif',
        fontSize:30,
        color :'white',



    },
    boton:{
        marginVertical:10
    }

})