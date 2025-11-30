import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground, Pressable, TouchableOpacity, Alert, Modal, Platform  } from 'react-native'
import {TransaccionController} from "../controllers/TransaccionController"
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistroIngresosScreen({navigation}){

    const [categoria, setCategoria] = useState('')
    const [comentario, setComentario] = useState('');
    const [monto, setMonto] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);    
    const [fecha, setFecha] = useState('');
    const [screen, setScreen] = useState('Gasto');
    const [dropdownVisible, setDropdownVisible] = useState(false)


    const categorias = [
    "Servicios",
    "Entretenimiento",
    "Despensa",
    "Transporte",
    "Salario",
    "Inversiones",
    "Regalos",
    "Otro"
    ]



    const controller =  useRef(new TransaccionController()).current // new TransaccionController()
    useEffect(() => {
        controller.initialize()
    }, [])



    const handleAgregarTransaccion = async (monto, categoria, fecha, descripcion, tipo) => {
    try {
        const nueva = await controller.crearTransaccion(
        monto,
        categoria,
        fecha,
        descripcion,
        tipo
        )

        Alert.alert(
        "Guardada",
        `Transacción creada exitosamente`
        )

        return nueva
    } catch (error) {
        Alert.alert("Error", error.message)
    }
    }




    return (
    <ImageBackground 
        source={require('../assets/fondoTransacciones.png')} 
        resizeMode='cover' 
        style={styles.background}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

            <View style={styles.titulo1}>
                <Text style={styles.titulo2}>CREAR TRANSACCIÓN</Text>
            </View>

            <View style={styles.pestañasContainer}>
                <View style={styles.pestaña}>
                    <Pressable onPress={() => setScreen('Gasto')}>
                        <Text style={[styles.titulo2, screen === 'Gasto' && { textDecorationLine: 'underline' }]}>GASTOS</Text>
                    </Pressable>
                </View>

                <View style={styles.pestaña}>
                    <Pressable onPress={() => setScreen('Ingreso')}>
                        <Text style={[styles.titulo2, screen === 'Ingreso' && { textDecorationLine: 'underline' }]}>INGRESOS</Text>
                    </Pressable>
                </View>
            </View>







            <View style={styles.Formulario}>

                <Text style={styles.datos}>Categoría</Text>
                <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setDropdownVisible(true)}
                >
                <Text style={styles.textCategoria}>▼  {categoria}</Text>
                </TouchableOpacity>


                <Modal visible={dropdownVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setDropdownVisible(false)}
                >
                    <View
                    style={styles.modalElememto}
                    >
                    {(categorias).map((cat) => (
                        <TouchableOpacity
                        key={cat}
                        onPress={() => {
                            setCategoria(cat)
                            setDropdownVisible(false)
                        }}
                        style={styles.modalElemento2}
                        >
                        <Text style={styles.textCategoria}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </TouchableOpacity>
                </Modal>





                <Text style={styles.datos}>Descripción</Text>
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
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                    <TextInput
                        style={styles.inputContainer}
                        value={fecha}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#666"
                        editable={false}       
                        pointerEvents="none"   
                    />
                </TouchableOpacity>

                {showCalendar && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "calendar"}
                        onChange={(event, selectedDate) => {
                            setShowCalendar(false);

                            if (selectedDate) {
                                const f = selectedDate.toLocaleDateString("es-MX");
                                setFecha(f);
                            }
                        }}
                    />
                )}

                <TouchableOpacity style={styles.botonAnadir}
                onPress={() => handleAgregarTransaccion(monto, categoria, fecha, comentario, screen)}
                >
                    <Text style={styles.botonAnadirTexto}>Añadir</Text>
                </TouchableOpacity>

            </View>

        <TouchableOpacity style={styles.btnAgregar}
        onPress={()=> navigation.navigate('TransaccionesScreen')}
        >
            <Text style={styles.titulo2}>Regresar</Text>
        </TouchableOpacity>

        </ScrollView>



    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
    },
    container:{
        /* backgroundColor: 'rgba(50, 110, 155, 0.8)', */ 
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
        paddingHorizontal: 55,
        marginTop: 10,
        position: 'absolute',
        /* backgroundColor: 'red', */
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
        backgroundColor: 'rgba(53, 71, 111, 1)', 
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
    },
    textCategoria: {
        fontSize: 15,
        color: '#666', 
        marginBottom: 5,
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalElememto: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10
    },
    modalElemento2: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    btnAgregar: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(53, 71, 111, 1)',
        borderRadius: 20,
        alignItems: 'center',
    }
})