import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PresupuestoController from '../controllers/PresupuestoController';

export default function AgregarPresupuestoScreen() {

    const navigation = useNavigation();
    
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [anio, setAnio] = useState(new Date().getFullYear().toString());

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mesDropdownVisible, setMesDropdownVisible] = useState(false);

    const categorias = [
        "Servicios",
        "Entretenimiento",
        "Despensa",
        "Transporte",
        "Salario",
        "Inversiones",
        "Regalos",
        "Otro"
    ];

    const meses = [
        "Enero", 
        "Febrero", 
        "Marzo", 
        "Abril", 
        "Mayo", 
        "Junio",
        "Julio", 
        "Agosto", 
        "Septiembre", 
        "Octubre", 
        "Noviembre",
        "Diciembre"
    ];

    const controllerRef = useRef(new PresupuestoController());
    const controller = controllerRef.current;

    useEffect(() => {
        (async () => {
            try {
                await controller.initialize();
            } catch (err) {
                console.error('Error inicializando controlador de presupuestos:', err);
            }
        })();
    }, []);

    const handleGuardar = async () => {
        if (!monto || categoria.trim() === '' || !mesSeleccionado || !anio) {
        Alert.alert("Atención", "Por favor, llena todos los campos, incluyendo la categoría y el año.");
        return;
        }

        const montoNumerico = parseFloat(monto);
        const anioNumerico = parseInt(anio, 10);

        if (isNaN(montoNumerico) || montoNumerico <= 0) {
            Alert.alert("Atención", "El monto debe ser un número válido mayor a cero.");
            return;
        }
        if (isNaN(anioNumerico) || anioNumerico < 2000 || anioNumerico > 2100) { 
            Alert.alert("Atención", "El año debe ser un valor válido (ej. 2024).");
            return;
        }

        try {
            await controller.crearPresupuesto(
                mesSeleccionado.trim(),
                montoNumerico,
                categoria.trim(),
                anioNumerico
            );

            Alert.alert(
                'Éxito',
                '¡Presupuesto guardado con éxito!',
                [
                    {
                        text: 'OK',
                        onPress: () => {

                                navigation.navigate('PresupuestoScreen');
                        }
                    }
                ]
            );

        } catch (error) {
            console.error("Error al guardar presupuesto:", error);
            Alert.alert('Error', error.message || 'Hubo un error al guardar.');
        }
    };

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
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setMesDropdownVisible(true)}
                        >
                            <Text style={{ color: mesSeleccionado ? 'white' : '#ddd' }}>
                                {mesSeleccionado || "Selecciona un mes..."}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Año del presupuesto</Text>
                        <TextInput
                        style={styles.input}
                        value={anio}
                        onChangeText={setAnio}
                        placeholder="Ej. 2024"
                        keyboardType="numeric"
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
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setDropdownVisible(true)}
                        >
                            <Text style={{ color: categoria ? '#000' : '#ddd' }}>
                                {categoria || "Selecciona una categoría..."}
                            </Text>
                        </TouchableOpacity>

                        <Modal visible={mesDropdownVisible} transparent animationType="fade">
                            <TouchableOpacity
                                style={styles.modalContainer}
                                onPress={() => setMesDropdownVisible(false)}
                            >
                                <View style={styles.modalElemento}>
                                    <Text style={styles.modalTitulo}>Selecciona Mes</Text>
                                    <ScrollView>
                                        {meses.map((mes) => (
                                            <TouchableOpacity
                                                key={mes}
                                                onPress={() => {
                                                    setMesSeleccionado(mes);
                                                    setMesDropdownVisible(false);
                                                }}
                                                style={styles.modalElemento2}
                                            >
                                                <Text style={styles.modalTexto}>{mes}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </TouchableOpacity>
                        </Modal>

                        <Modal visible={dropdownVisible} transparent animationType="fade">
                            <TouchableOpacity
                                style={styles.modalContainer}
                                onPress={() => setDropdownVisible(false)}
                            >
                                <View style={styles.modalElemento}>
                                    <Text style={styles.modalTitulo}>Selecciona Categoría</Text>
                                    <ScrollView>
                                        {categorias.map((cat) => (
                                            <TouchableOpacity
                                                key={cat}
                                                onPress={() => {
                                                    setCategoria(cat);
                                                    setDropdownVisible(false);
                                                }}
                                                style={styles.modalElemento2}
                                            >
                                                <Text style={styles.modalTexto}>{cat}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>

                    {/* <View style={styles.botonCrear}>
                        <Text style={styles.botonCrearTexto}>Guardar</Text>
                    </View> */}

                    <TouchableOpacity 
                        style={styles.botonCrear}
                        onPress={handleGuardar}
                    >
                        <Text style={styles.botonCrearTexto}>Guardar</Text>
                    </TouchableOpacity>

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
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", 
        justifyContent: "center",
        alignItems: "center"
    },
    modalElemento: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        maxHeight: '60%', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalElemento2: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    modalTitulo: {
        fontSize: 18,
        fontWeight: '700', 
        textAlign: 'center',
        paddingBottom: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    modalTexto: {
        fontSize: 16,
        color: '#333'
    }

});
