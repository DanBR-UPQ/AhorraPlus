import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'


export default function RegistroIngresosScreen(){

    const [categoria, setCategoria] = useState('');
    const [comentario, setComentario] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

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
            <TextInput
                style={styles.inputContainer}
                value={categoria}
                onChangeText={setCategoria}
                placeholder="Categoría"
                placeholderTextColor="#000000ff"
            />

            <Text style={styles.datos}>Comentario</Text>
            <TextInput
                style={[styles.inputContainer, { textAlignVertical: 'top' }]}
                value={comentario}
                onChangeText={setComentario}
                placeholder="Comentario"
                placeholderTextColor="#666"
            />

            <Text style={styles.datos}>Monto</Text>
            <TextInput
                style={styles.inputContainer}
                value={monto}
                onChangeText={setMonto}
                placeholder="Monto"
                placeholderTextColor="#666"
                keyboardType="numeric"
            />


            <Text style={styles.datos}>Fecha</Text>
            <TextInput
                style={styles.inputContainer}
                value={fecha}
                onChangeText={setFecha}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#666"
            />


            <View style={styles.botonAnadir}>
                <Text style={styles.botonAnadirTexto}>Añadir</Text>
            </View>

        </View>

    </ScrollView>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#326E9B',
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
        paddingHorizontal: 10,
        color: '#000',
    },
    botonAnadirTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    botonAnadir: {
        backgroundColor: '#004C99', 
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 10,
        shadowColor: '#000',
        elevation: 5,
        width: 120,
        alignSelf: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 50,
    }
})