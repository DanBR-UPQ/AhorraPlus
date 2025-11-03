import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function RegistroIngresosScreen(){

    return (
    <View style={styles.container}>

        <View style={styles.titulo1}>
            <Text style={styles.titulo2}>REGISTROS</Text>
        </View>

        <View style={styles.pestañasContainer}>
            <View style={styles.pestaña}>
                <Text style={styles.titulo2}>GASTOS</Text>
            </View>

            <View style={styles.pestaña}>
                <Text style={styles.titulo2}>INGRESOS</Text>
            </View>
        </View>

        <View style={styles.Formulario}>

            <Text style={styles.datos}>Categoría</Text>
            <View style={styles.inputContainer}></View>

            <Text style={styles.datos}>Comentario</Text>
            <View style={styles.inputContainer}></View>

            <Text style={styles.datos}>Monto</Text>
            <View style={styles.inputContainer}></View>

            <Text style={styles.datos}>Fecha</Text>
            <View style={styles.inputContainer}></View>

        </View>

    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#326E9B', 
        alignItems: 'center',
        paddingTop: 20,
    },
    titulo1: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        top: 20,
    },
    pestañasContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        position: 'absolute',
        top: 60,
    },
    pestaña: {
        paddingHorizontal: 10,
    },
    titulo2: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    Formulario: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 120,
    },
    datos: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333', 
        marginBottom: 5,
        marginTop: 15,
    },
    inputContainer: {
        backgroundColor: '#E0E0E0',
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
})