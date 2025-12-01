import { Text, StyleSheet, View, ImageBackground,TextInput, Image, Button,Alert} from 'react-native'
import React, { useState } from 'react'
import DatabaseService from '../database/DatabaseService'
import UsuarioController from '../controllers/UsuarioController'
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen ({ goTo }) {
const[correo, setCorreo]= useState('');
const[clave, setClave] = useState('');
const navigation = useNavigation();
const handleLogin = async () => {
    try {
        await UsuarioController.initialize()
        if (correo.trim() === '' || clave.trim() === '') {
            Alert.alert('Error', 'rellena todos los campos');
            return;
        }

        await UsuarioController.login(correo.trim(), clave)
        Alert.alert('Éxito', 'Inicio de sesión correcto.')

        const usuario = await DatabaseService.getUsuarioByCorreo(correo);
        DatabaseService.setCurrentUser(usuario.id);
        navigation.navigate('HomeScreen')
        
        
    } catch (err) {
        Alert.alert('Error', err.message || 'Error en login')
    }
};

const handleRegister = async () => {
        // Navegar a la pantalla de creación para pedir nombre, teléfono y pregunta de recuperación
        navigation.navigate('CrearScreen')
}

const handleRecovery = () => {
    if (goTo && typeof goTo === 'function') {
        goTo('Recuperar Contraseña')
    } else {
        navigation.navigate('RecuperarContraseña')
    }
}

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
                        value={correo}
                        onChangeText={(valor)=>setCorreo(valor)}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        />
          
                        <Text style={styles.subtitulos}>Ingresa tu contraseña</Text>
                        <TextInput style={styles.entrada}
                        placeholder='contraseña'
                        value={clave}
                        secureTextEntry={true}
                        onChangeText={(pas)=>setClave(pas)}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                        <Button title='Iniciar sesión' style={styles.boton} onPress={handleLogin}></Button>
                        <Button title='Registrarse' style={styles.boton} onPress={handleRegister}></Button>
                        <Button title='Recuperar contraseña' style={styles.boton} onPress={handleRecovery}></Button>

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
    }

})