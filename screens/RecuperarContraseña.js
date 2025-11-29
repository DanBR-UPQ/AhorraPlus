import { Text, StyleSheet, View, ImageBackground,TextInput, Image, Button,Alert} from 'react-native'
import React, { useState } from 'react'





export default function RecuperarContraseña () {
const[correo, setCorreo]= useState('ingresa un correo o telefono');
const handleLogin = () => {
  if (correo.trim() === '' || clave.trim() === '') {
    Alert.alert('Error', 'rellena todos los campos');
    return;
  }

  Alert.alert( 'Correo de verificacion creado exitosamente');
};

    return (
        <View style={styles.background}>

       <Text style={styles.subtituloss}> Recupera tu Contraseña</Text>
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
          
            
            
            <Button title='Enviar Correo' style={styles.boton} onPress={handleLogin}></Button>
            

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
        width:'180',
        height:'180',
        borderRadius:90,
        resizeMode:'contain'

    },
      subtitulos:{
        fontFamily:'sans-serif',
        fontSize:30,
        color :'white',



    },
    boton:{
        marginVertical:10
    },
        subtituloss:{
        fontFamily:'sans-serif',
        fontSize:35,
        color :'white',
        



    },

})