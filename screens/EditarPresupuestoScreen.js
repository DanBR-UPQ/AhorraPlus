import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground, Pressable } from 'react-native';

export default function EditarPresupuestoScreen() {

    const [nombre, setNombre] = useState('Septiembre');
    const [monto, setMonto] = useState('1500');
    const [categoria, setCategoria] = useState('Entretenimiento');

    const handleAceptar = () => {
        console.log("Cambios guardados:", { nombre, monto, categoria });
    };

    const handleCancelar = () => {
        console.log("Edición cancelada");
    };

    const handleEliminar = () => {
        console.log("Presupuesto eliminado");
    };

    return (
        <ImageBackground 
            source={require('../assets/fondoPresupuesto.png')} 
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

                <View style={styles.titulo1}>
                    <Text style={styles.titulo2}>Editar Presupuesto</Text>
                </View>

                <View style={styles.formulario}>
                    <View style={styles.fondoMeta}>
                        <Text style={styles.metaTexto}>Modificar Datos</Text>
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

                    <View style={styles.botonesContainer}>
                        <Pressable style={[styles.boton, styles.botonAceptar]} onPress={handleAceptar}>
                            <Text style={styles.textoBoton}>Aceptar</Text>
                        </Pressable>

                        <Pressable style={[styles.boton, styles.botonCancelar]} onPress={handleCancelar}>
                            <Text style={styles.textoBoton}>Cancelar</Text>
                        </Pressable>

                        <Pressable style={[styles.boton, styles.botonEliminar]} onPress={handleEliminar}>
                            <Text style={styles.textoBoton}>Eliminar</Text>
                        </Pressable>
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
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        paddingHorizontal: 15,
    },
    boton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 25,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonAceptar: {
        backgroundColor: '#70b2f3ff',
    },
    botonCancelar: {
        backgroundColor: '#bbb',
    },
    botonEliminar: {
        backgroundColor: '#e74c3c',
    },
    textoBoton: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
    },
});