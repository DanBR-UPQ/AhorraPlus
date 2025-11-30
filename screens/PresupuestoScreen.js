import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PresupuestoController from '../controllers/PresupuestoController';


export default function PresupuestoScreen() {
    const [presupuestos, setPresupuestos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");

    const controllerRef = useRef(new PresupuestoController());
    const controller = controllerRef.current;

    const navigation = useNavigation();

    const recargarPresupuestos = async () => {
        const data = await controller.obtenerPresupuestos();
        setPresupuestos(data);
    };

    useEffect(() => {
        const setup = async () => {
            await controller.initialize();
            controller.addListener(recargarPresupuestos);
            recargarPresupuestos(); 
        };

        setup();

        return () => {
            controller.removeListener(recargarPresupuestos);
        };
    }, []);

    const getCategoriaLabel = () => {
        return filtroCategoria === "" ? "Seleccionar.." : filtroCategoria;
    };


    const presupuestosFiltrados = presupuestos.filter(p => {
        const coincideCategoria = filtroCategoria.trim() === "" 
            ? true 
            : p.categoria.toLowerCase().includes(filtroCategoria.toLowerCase());

        const coincideFecha = filtroFecha.trim() === ""
            ? true
            : getMesNombre(p.nombre).toLowerCase().includes(filtroFecha.toLowerCase());

        return coincideCategoria && coincideFecha;
    });


    return (
    <ImageBackground 
        source={require('../assets/fondoPresupuesto.png')} 
        style={styles.backgroundImage}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

            <View style={styles.titulo1}>
                <Text style={styles.titulo2}>Presupuestos</Text>
            </View>



            <View style={styles.filtrosContainer}>


                <Text>Categoría: </Text>

                <TouchableOpacity style={styles.fechaSelectContainer}>
                    <TextInput
                        value={filtroCategoria}
                        onChangeText={setFiltroCategoria}
                        placeholder="Seleccionar.."
                        style={{ maxWidth: 85, color: "black" }}
                        numberOfLines={1}
                    />
                </TouchableOpacity>

                <Text> Fecha: </Text>

                <TouchableOpacity style={styles.fechaSelectContainer}>
                    <TextInput
                        value={filtroFecha}
                        onChangeText={setFiltroFecha}
                        placeholder="Seleccionar.."
                        style={{ maxWidth: 90, color: "black" }}
                        numberOfLines={1}
                    />
                </TouchableOpacity>
                
                <Pressable
                    onPress={() => {setFiltroFecha(""); setFiltroCategoria("");}}
                    style={{
                        backgroundColor: 'gray',
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        marginStart: 5,
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '700' }}>X</Text>
                </Pressable>

            </View>
            


            {presupuestosFiltrados.map(p => (
                <View key={p.id} style={styles.meta}>
                    <View style={styles.fondoMeta}>
                    <Text style={styles.metaTexto}>{p.nombre}</Text>
                    </View>
                    <Text style={styles.textoF}>
                        Período: {p.nombre} de {p.anio} 
                    </Text>
                    <View style={styles.contenido}>
                    <Text style={styles.texto}>Monto: ${p.monto}</Text>
                    <Text style={styles.texto}>Categoría: {p.categoria}</Text>

                    <TouchableOpacity
                                style={styles.botonEditar} 
                                onPress={() => {
                                    navigation.navigate('EditarPresupuestoScreen', { presupuesto: p });
                                }}
                            >
                                <Text style={styles.botonEditarTexto}>Editar</Text>
                            </TouchableOpacity>

                    </View>
                </View>
                ))}

        <TouchableOpacity
            style={styles.botonCrear}
            onPress={() => navigation.navigate('AgregarPresupuestoScreen')}  
            >
                <Text style={styles.botonCrearTexto}>+ Crear </Text>
        </TouchableOpacity>


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
        /* backgroundColor: 'rgba(195, 203, 248, 0.8)',  */
    },
    scrollContainer:{
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
        /* color: '#7c7c7cff' */
    },
    titulo2: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
    meta: {
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
        padding: 10,
        paddingVertical: 20,
    },
    texto: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },
    textoF: {
        color: 'black',
        fontSize: 14,
        marginBottom: 5,
    },
    botonCrearTexto: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    botonCrear: {
        backgroundColor: '#70b2f3ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 80,
        alignSelf: 'end',
        borderRadius: 25,
        paddingVertical: 5,
    },
    botonEditar: {
        marginTop: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#ffd97a',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    botonEditarTexto: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600',
    },
    filtrosContainer: {
        flex: 1.3,
        /* backgroundColor: '#ac9a9aff', */
        borderBottomWidth: 3,
        borderBottomColor: '#9F9393',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        /* flexWrap: 'wrap', */
    },
    montoText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 16,
    },
    fechaSelectContainer: {
       /*  backgroundColor: '#f4f4f4ff', */
        borderColor: 'black',
        borderRadius: 4,
        padding: 2,
        borderWidth: 1,
        /* height: 30, */
       /*  maxWidth: '50%', */
    },
});
