import { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground, FlatList, TouchableOpacity, TextInput, Modal, Alert, Platform  } from 'react-native'
import { TransaccionController } from '../controllers/TransaccionController'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TransaccionesScreen( {navigation}) {
    const [screen, setScreen] = useState('gastos')
    const [fecha, setFecha] = useState('dia')
    const [loading, setLoading] = useState(true)
    const [transacciones, setTransacciones] = useState([])
    const [filtroCat, setFiltroCat] = useState("")
    const [filtroFecha, setFiltroFecha] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    const [showCategoriaModal, setShowCategoriaModal] = useState(false)
    const [showDetallesModal, setShowDetallesModal] = useState(false)
    const [selectedTransaccion, setSelectedTransaccion] = useState(null)
    const [editingFields, setEditingFields] = useState({})
    const [showCategoriaModalDetalles, setShowCategoriaModalDetalles] = useState(false)
    const [showDatePickerDetalles, setShowDatePickerDetalles] = useState(false)

    const controller =  useRef(new TransaccionController()).current // new TransaccionController()
    useEffect(() => {
        controller.initialize()
    }, [])



    const cargarTransacciones = useCallback(async() => {
        try {
            setLoading(true)
            const data = await controller.obtenerTransacciones()
            setTransacciones(data)
            console.log(`${data.length} transacciones cargados`)
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }, [])



    const transaccionesFiltradas = transacciones.filter(item => {
        const tipo = item.tipo.toLowerCase()
        const cumpleTipo = (screen === 'gastos') ? tipo === 'gasto' : tipo === 'ingreso'
        const cumpleCategoria = filtroCat === "" || item.categoria === filtroCat
        const cumpleFecha = filtroFecha === "" || item.fecha === filtroFecha

        return cumpleTipo && cumpleCategoria && cumpleFecha
    })


    useEffect(() => {
        const init = async() => {
            await controller.initialize()
            await cargarTransacciones()
        }
        
        init()
        controller.addListener(cargarTransacciones)
        
        
        return () => {
            controller.removeListener(cargarTransacciones)
        }
    }, [cargarTransacciones])


    const renderTransaccion = ({ item, index}) => (

        <Pressable onPress={() => handleSelectTransaccion(item)} style={styles.elemContainer}>
            <View style={styles.elemIzq}>
                <Text style={styles.categoriaText}>{item.categoria}</Text>
                <Text style={styles.comentarioText}>{item.descripcion}</Text>
            </View>
            <View style={styles.elemDer}>
                <Text style={styles.montoText}>$ {item.monto}</Text>
                <Text style={styles.comentarioText}>{item.fecha}</Text>
            </View>
        </Pressable>
    )

    const categorias =
        [
            { label: "Servicios", value: "Servicios" },
            { label: "Entretenimiento", value: "Entretenimiento" },
            { label: "Despensa", value: "Despensa" },
            { label: "Transporte", value: "Transporte" },
            { label: "Salario", value: "Salario" },
            { label: "Inversiones", value: "Inversiones" },
            { label: "Regalos", value: "Regalos" },
            { label: "Otros", value: "Otros" },
        ]


        /* TODOS LOS HANDLES */

        
    const handleSelectCategoria = (value) => {
        setFiltroCat(value)
        setShowCategoriaModal(false)
    }

    const getCategoriaLabel = () => {
        if (filtroCat === "") return "Seleccionar.."
        const found = categorias.find(cat => cat.value === filtroCat)
        return found ? found.label : "Seleccionar.."
    }

    const handleSelectTransaccion = (transaccion) => {
        setSelectedTransaccion(transaccion)
        setEditingFields({
            monto: transaccion.monto.toString(),
            categoria: transaccion.categoria,
            fecha: transaccion.fecha,
            descripcion: transaccion.descripcion,
            tipo: transaccion.tipo,
        })
        setShowDetallesModal(true)
    }

    const handleCloseDetallesModal = () => {
        setShowDetallesModal(false)
        setSelectedTransaccion(null)
        setEditingFields({})
        setShowCategoriaModalDetalles(false)
        setShowDatePickerDetalles(false)
    }

    const handleUpdateField = (field, value) => {
        setEditingFields(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleGuardarCambios = async () => {
        try {
            if (!selectedTransaccion) return

            const updates = {
                monto: parseFloat(editingFields.monto),
                categoria: editingFields.categoria,
                fecha: editingFields.fecha,
                descripcion: editingFields.descripcion,
                tipo: editingFields.tipo,
            }

            await controller.actualizarTransaccion(selectedTransaccion.id, updates)
            Alert.alert('Éxito', 'Transacción actualizada correctamente')
            handleCloseDetallesModal()
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const handleDeleteTransaccion = () => {
        Alert.alert(
            'Eliminar transacción',
            '¿Estás seguro de que deseas eliminar esta transacción?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            if (!selectedTransaccion) return
                            await controller.eliminarTransaccion(selectedTransaccion.id)
                            Alert.alert('Éxito', 'Transacción eliminada correctamente')
                            handleCloseDetallesModal()
                        } catch (error) {
                            Alert.alert('Error', error.message)
                        }
                    },
                    style: 'destructive',
                },
            ]
        )
    }






  return (
    <ImageBackground 
    source={require('../assets/fondoTransacciones.png')}
    resizeMode='cover'
    style={styles.container}
    >

        
        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Transacciones</Text>
        </View>

        
        <View style={styles.selectorContainer}>
            <View style={styles.gastosBoton}>
                <Pressable onPress={() => setScreen('gastos')}>
                    <Text
                        style={[
                            styles.titulo2,
                            screen === 'gastos' && styles.textoSeleccionado
                        ]}
                    >
                        GASTOS
                    </Text>
                </Pressable>
            </View>

            <View style={styles.ingresosBoton}>
                <Pressable onPress={() => setScreen('ingresos')}>
                    <Text
                        style={[
                            styles.titulo2,
                            screen === 'ingresos' && styles.textoSeleccionado
                        ]}
                    >
                        INGRESOS
                    </Text>
                </Pressable>
            </View>
        </View>


            {/* ZONA MAIN */}


        <View style={styles.mainContainer}>

                {/* ZONA FILTROS */}

            <View style={styles.filtrosContainer}>
                {/* <Text style={styles.montoText}>FILTROS</Text> */}

                {/* PICKER Y EL CALEDNARIO */}

                <Text>Categoría: </Text>
                <TouchableOpacity onPress={() => setShowCategoriaModal(true)} style={styles.fechaSelectContainer}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ maxWidth: 85, color: "black" }}
                    >
                        {getCategoriaLabel()}
                    </Text>
                </TouchableOpacity>

                <Modal
                    visible={showCategoriaModal}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitulo}>Seleccionar Categoría</Text>
                            {categorias.map((cat, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.categoryOpcion}
                                    onPress={() => handleSelectCategoria(cat.value)}
                                >
                                    <Text style={[
                                        styles.categoryOpcionText,
                                        filtroCat === cat.value && styles.categoryOpcionSelected
                                    ]}>
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={styles.cerrarModalButton}
                                onPress={() => setShowCategoriaModal(false)}
                            >
                                <Text style={styles.cerrarModalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <Text> Fecha: </Text>
                <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.fechaSelectContainer}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ maxWidth: 90, color: "black" }}
                    >
                        {filtroFecha === "" ? "Seleccionar.." : filtroFecha}
                    </Text>
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
                                setFiltroFecha(f);
                            }
                        }}
                    />
                )}

                    <Pressable
                        onPress={() => {setFiltroFecha(""); handleSelectCategoria("");}}
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



                {/* ZONA TRANSACCIONES */}


            <View style={styles.transaccionesContainer}>


                <FlatList
                    data={transaccionesFiltradas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTransaccion}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.montoText}>No hay transacciones</Text>
                        </View>
                    }
                    style={{ width: '100%' }}
                    contentContainerStyle={transacciones.length === 0 && styles.emptyList}
                />        

                <TouchableOpacity style={styles.btnAgregar}
                onPress={() => navigation.navigate('RegistroIngresosScreen')}
                >
                    <Text style={styles.btnText}>Agregar +</Text>
                </TouchableOpacity>   

            </View>
        </View>


                    {/* ZONA MODAL DETALLES / EDITAR / ELIMINAR */}


        <Modal
            visible={showDetallesModal}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCloseDetallesModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitulo}>Editar Transacción</Text>

                    <Text style={styles.label}>Monto</Text>
                    <TextInput
                        style={styles.input}
                        value={editingFields.monto}
                        onChangeText={(text) => handleUpdateField('monto', text)}
                        keyboardType="decimal-pad"
                        placeholder="0.00"
                    />

                    <Text style={styles.label}>Tipo</Text>
                    <View style={styles.tipoContainer}>
                        <TouchableOpacity 
                            style={[styles.tipoBtn, editingFields.tipo === 'Gasto' && styles.tipoBtnActive]}
                            onPress={() => handleUpdateField('tipo', 'Gasto')}
                        >
                            <Text style={[styles.tipoBtnText, editingFields.tipo === 'Gasto' && styles.tipoBtnTextActive]}>
                                Gasto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tipoBtn, editingFields.tipo === 'Ingreso' && styles.tipoBtnActive]}
                            onPress={() => handleUpdateField('tipo', 'Ingreso')}
                        >
                            <Text style={[styles.tipoBtnText, editingFields.tipo === 'Ingreso' && styles.tipoBtnTextActive]}>
                                Ingreso
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Categoría</Text>
                    <TouchableOpacity 
                        onPress={() => setShowCategoriaModalDetalles(true)} 
                        style={styles.input}
                    >
                        <Text>{editingFields.categoria || "Seleccionar..."}</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Fecha</Text>
                    <TouchableOpacity 
                        onPress={() => setShowDatePickerDetalles(true)} 
                        style={styles.input}
                    >
                        <Text>{editingFields.fecha || "dd/mm/aaaa"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={[styles.input, styles.inputMultiline]}
                        value={editingFields.descripcion}
                        onChangeText={(text) => handleUpdateField('descripcion', text)}
                        placeholder="Agregar descripción"
                        multiline
                        numberOfLines={3}
                    />

                    <View style={styles.btnRow}>
                        <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardarCambios}>
                            <Text style={styles.btnText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnEliminar} onPress={handleDeleteTransaccion}>
                            <Text style={styles.btnText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnCancelar} onPress={handleCloseDetallesModal}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal visible={showCategoriaModalDetalles} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitulo}>Categoría</Text>
                    {categorias.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryOpcion}
                            onPress={() => {
                                handleUpdateField('categoria', cat.value)
                                setShowCategoriaModalDetalles(false)
                            }}
                        >
                            <Text style={[
                                styles.categoryOpcionText,
                                editingFields.categoria === cat.value && styles.categoryOpcionSelected
                            ]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.cerrarModalButton}
                        onPress={() => setShowCategoriaModalDetalles(false)}
                    >
                        <Text style={styles.cerrarModalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        {showDatePickerDetalles && (
            <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "calendar"}
                onChange={(event, selectedDate) => {
                    setShowDatePickerDetalles(false);
                    if (selectedDate) {
                        handleUpdateField('fecha', selectedDate.toLocaleDateString("es-MX"));
                    }
                }}
            />
        )}
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(110, 139, 201, 1)',
        alignItems: 'center',
    },
    tituloContainer: {
        width: '100%',
        height: '5%',
        marginTop: 20,
       /*  backgroundColor: 'gray',   */
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titulo: {
        color: 'white',
        fontSize: 18,
        fontWeight: 700,
        /* fontFamily: 'Inter', */
    },
    titulo2: {
        color: 'white',
        fontSize: 15,
        fontWeight: 400,
        /* fontFamily: 'Inter', */
    },
    textoSeleccionado: {
        textDecorationLine: 'underline',
        fontWeight: '700',
    },
    selectorContainer: {
        width: '80%',
        height: '5%',
        flexDirection: 'row',
        gap: 50,
        paddingBottom: 5,
        /* backgroundColor: '#9b9898ff',  */
    },
    gastosBoton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingresosBoton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainContainer: {
        width: '90%',
        height: '85%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
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
    fechaPressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fechaTexto: {
        color: '#42688eff',
        fontSize: 13,
        /* fontFamily: 'Inter', */
    },
    textoSeleccionadoFecha: {
        textDecorationLine: 'underline',
        fontWeight: '700',
    },
    transaccionesContainer: {
        flex: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        /* backgroundColor: '#c8b5b5ff',   */      
    },

    fecha2Texto: {
        color: 'rgba(159, 147, 147, 1)',
        fontWeight: '700',
        alignSelf: 'flex-start',
        fontSize: 10,
        marginBottom: 10,
        marginStart: 10,
    },

    elemContainer: {
        width: '90%',
        /* width: 270, */
        height: 50,
        backgroundColor: 'rgba(148, 154, 177, 1)',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    elemIzq: {
        flex: 2,
        justifyContent: 'center',
        marginStart: 10,
        gap: 5,
        /* flexShrink: 1, */
        /* backgroundColor: 'blue',  */
    },
    elemDer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginEnd: 15,
        /* backgroundColor: 'red', */
    },
    categoriaText: {
        /* fontFamily: 'Inter', */
        fontWeight: '700',
        /* flexShrink: 1, 
        flexWrap: 'wrap', */
        fontSize: 15,
    },
    comentarioText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 11,
        color: 'rgba(107, 101, 101, 1)',
    },
    montoText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 16,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
    },
    fechaSelectContainer: {
       /*  backgroundColor: '#f4f4f4ff', */
        borderColor: 'gray',
        borderRadius: 4,
        padding: 2,
        borderWidth: 1,
        /* height: 30, */
       /*  maxWidth: '50%', */
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '85%',
        padding: 20,
        maxHeight: '90%',
    },
    modalTitulo: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f4f4f4',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
    },
    inputMultiline: {
        height: 70,
        textAlignVertical: 'top',
    },
    tipoContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    tipoBtn: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    tipoBtnActive: {
        backgroundColor: 'rgba(53, 71, 111, 1)',
        /* borderColor: 'rgba(110, 139, 201, 1)', */
    },
    tipoBtnText: {
        fontWeight: '600',
        color: '#333',
    },
    tipoBtnTextActive: {
        color: 'white',
    },
    btnRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    btnGuardar: {
        flex: 1,
        backgroundColor: 'rgba(53, 71, 111, 1)',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    btnEliminar: {
        flex: 1,
        backgroundColor: '#c53030',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
    },
    btnCancelar: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        alignItems: 'center',
    },
    btnCancelarText: {
        fontWeight: '600',
        color: '#666',
    },
    categoryOpcion: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    categoryOpcionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    categoryOpcionSelected: {
        fontWeight: '700',
        color: 'rgba(53, 71, 111, 1)',
    },
    cerrarModalButton: {
        marginTop: 15,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        alignItems: 'center',
    },
    cerrarModalButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    btnAgregar: {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(53, 71, 111, 1)',
        borderRadius: 20,
        alignItems: 'center',
    }
})