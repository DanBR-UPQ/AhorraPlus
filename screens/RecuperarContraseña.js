import { Text, StyleSheet, View, ImageBackground,TextInput, Image, Button,Alert } from 'react-native'
import React, { useState } from 'react'
import UsuarioController from '../controllers/UsuarioController'
import { useNavigation } from '@react-navigation/native'





export default function RecuperarContraseña () {
const[correo, setCorreo]= useState('')
const navigation = useNavigation()
const [mascota, setMascota] = useState('')

const handleEnviar = async () => {
    try {
        if (!correo || correo.trim() === '') {
            Alert.alert('Error', 'Ingresa correo o teléfono')
            return
        }
        if (!mascota || mascota.trim() === '') {
            Alert.alert('Error', 'Ingresa el nombre de tu primera mascota (MAYÚSCULAS)')
            return
        }

        await UsuarioController.initialize()
        const user = await UsuarioController.verifyRecoveryAnswer(correo.trim(), mascota.trim())
        if (!user) {
            Alert.alert('No coincide', 'Correo/telefono o respuesta de seguridad incorrecta')
            return
        }
        // verificado: navegar a la pantalla de restablecer pasando el identificador
        Alert.alert('Verificado', 'Respuesta correcta. Ahora puedes cambiar tu contraseña.')
        navigation.navigate('ResetPasswordScreen', { identifier: correo.trim() })
    } catch (err) {
        Alert.alert('Error', err.message || 'Error en verificación')
    }
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

            <Text style={styles.subtitulos}>Nombre de tu primera mascota (MAYÚSCULAS)</Text>
            <TextInput style={styles.entrada}
            placeholder='EJ: FIDO'
                        value={mascota}
                        onChangeText={(valor) => setMascota(valor)}
            placeholderTextColor="rgba(255,255,255,0.7)"
            />

            <Button title='confirmar datos' style={styles.boton} onPress={handleEnviar}></Button>
            

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