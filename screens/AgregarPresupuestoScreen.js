import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground } from 'react-native';


export default function AngregarPresupuestoScreen() {

    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');

    return (
        <ImageBackground 
            source={require('../assets/fondoPresupuesto.png')} 
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

                <View style={styles.titulo1}>
                    <Text style={styles.titulo2}>Agregar Presupuesto</Text>
                </View>

                <View style={styles.formulario}>
                    <View style={styles.fondoMeta}>
                        <Text style={styles.metaTexto}>Nuevo Presupuesto</Text>
                    </View>

                    <View style={styles.contenido}>
                        <Text style={styles.label}>Mes del presupuesto</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Ej. Septiembre"
                            placeholderTextColor="#ddd"
                        />

                        <Text style={styles.label}>Monto</Text>
                        <TextInput
                            style={styles.input}
                            value={monto}
                            onChangeText={setMonto}
                            placeholder="Ej. 1500"
                            keyboardType="numeric"
                            placeholderTextColor="#ddd"
                        />

                        <Text style={styles.label}>Categoría</Text>
                        <TextInput
                            style={styles.input}
                            value={categoria}
                            onChangeText={setCategoria}
                            placeholder="Ej. Servicios, Entretenimiento..."
                            placeholderTextColor="#ddd"
                        />
                    </View>

                    <View style={styles.botonCrear}>
                        <Text style={styles.botonCrearTexto}>Guardar</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        /* backgroundColor: 'rgba(195, 203, 248, 0.8)', */
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 50,
    },
    titulo1: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    titulo2: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
    formulario: {
        backgroundColor: 'rgba(239, 238, 243, 0.6)',
        width: '90%',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 30,
    },
    fondoMeta: {
        backgroundColor: '#0e1e29ff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        paddingVertical: 8,
    },
    metaTexto: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
    },
    contenido: {
        backgroundColor: '#5492bbff',
        borderRadius: 10,
        padding: 15,
        paddingVertical: 20,
    },
    label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'white',
    },
    botonCrear: {
        backgroundColor: '#70b2f3ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 120,
        alignSelf: 'center',
        borderRadius: 25,
        paddingVertical: 8,
    },
    botonCrearTexto: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
