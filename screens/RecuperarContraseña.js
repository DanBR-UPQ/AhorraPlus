import { Text, StyleSheet, View, ImageBackground,TextInput, Image, Button,Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import UsuarioController from '../controllers/UsuarioController'
import { sendRecoveryEmailBackend } from '../utils/emailApi'
import { useNavigation } from '@react-navigation/native'





export default function RecuperarContraseña () {
const[correo, setCorreo]= useState('')
const navigation = useNavigation()
const handleEnviar = async () => {
    try {
        if (!correo || correo.trim() === '') {
            Alert.alert('Error', 'Ingresa correo o teléfono')
            return
        }

        const { user, code } = await UsuarioController.requestRecovery(correo.trim())
        if (!user) {
            Alert.alert('No encontrado', 'No existe ningún usuario con ese correo/teléfono')
            return
        }

        // intentar enviar vía backend configurable
        try {
            await sendRecoveryEmailBackend(user.correo, code)
            Alert.alert('Enviado', 'Se ha enviado un correo de recuperación a tu email')
            return
        } catch (err) {
            // Mostrar el error del backend al usuario para diagnóstico
            const msg = (err && err.message) ? err.message : String(err)
            console.warn('Backend email failed, falling back to mailto:', msg)
            Alert.alert('Error de envío automático', `Error backend: ${msg}. Se abrirá el cliente de correo como alternativa.`)
            const subject = encodeURIComponent('Recuperación de contraseña')
            const body = encodeURIComponent(`Código de recuperación: ${code}\n\nIngresa este código en la aplicación para restablecer tu contraseña. No compartas este código con nadie.`)
            const mailto = `mailto:${user.correo}?subject=${subject}&body=${body}`
            Linking.openURL(mailto)
        }
    } catch (err) {
        Alert.alert('Error', err.message || 'No se pudo enviar correo')
    }
}

const goToReset = () => {
    navigation.navigate('ResetPasswordScreen')
}

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
                        value={correo}
                        onChangeText={(valor) => setCorreo(valor)}
            placeholderTextColor="rgba(255,255,255,0.7)"
            />
          
            
            
            <Button title='Enviar Correo' style={styles.boton} onPress={handleEnviar}></Button>
            <View style={{height:8}} />
            <Button title='Ya tengo un código' style={styles.boton} onPress={goToReset}></Button>
            

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