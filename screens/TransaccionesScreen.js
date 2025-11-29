import { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native'
import { TransaccionController } from '../controllers/TransaccionController'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TransaccionesScreen() {
    const [screen, setScreen] = useState('gastos')
    const [fecha, setFecha] = useState('dia')
    const [loading, setLoading] = useState(true)
    const [transacciones, setTransacciones] = useState([])
    const [filtroCat, setFiltroCat] = useState("")
    const [filtroFecha, setFiltroFecha] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [selectedTransaccion, setSelectedTransaccion] = useState(null)
    const [editingFields, setEditingFields] = useState({})
    const [showCategoryModalDetail, setShowCategoryModalDetail] = useState(false)
    const [showDatePickerDetail, setShowDatePickerDetail] = useState(false)

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

    const categorias = screen === 'gastos' ? 
        [
            { label: "Todos", value: "" },
            { label: "Servicios", value: "Servicios" },
            { label: "Entretenimiento", value: "Entretenimiento" },
            { label: "Despensa", value: "Despensa" },
            { label: "Transporte", value: "Transporte" },
            { label: "Otros", value: "Otros" },
        ] : 
        [
            { label: "Todos", value: "" },
            { label: "Salario", value: "Salario" },
            { label: "Inversiones", value: "Inversiones" },
            { label: "Regalos", value: "Regalos" },
            { label: "Otros", value: "Otros" },   
        ]

    const handleSelectCategory = (value) => {
        setFiltroCat(value)
        setShowCategoryModal(false)
    }

    const getCategoryLabel = () => {
        if (filtroCat === "") return "Seleccionar..."
        const found = categorias.find(cat => cat.value === filtroCat)
        return found ? found.label : "Seleccionar..."
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
        setShowDetailModal(true)
    }

    const handleCloseDetailModal = () => {
        setShowDetailModal(false)
        setSelectedTransaccion(null)
        setEditingFields({})
        setShowCategoryModalDetail(false)
    }

    const handleUpdateField = (field, value) => {
        setEditingFields(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const getCategoryLabelDetail = () => {
        const tipoTransaccion = selectedTransaccion?.tipo.toLowerCase() === 'gasto' ? 'gastos' : 'ingresos'
        const cats = tipoTransaccion === 'gastos' ? 
            [
                { label: "Servicios", value: "Servicios" },
                { label: "Entretenimiento", value: "Entretenimiento" },
                { label: "Despensa", value: "Despensa" },
                { label: "Transporte", value: "Transporte" },
                { label: "Otros", value: "Otros" },
            ] : 
            [
                { label: "Salario", value: "Salario" },
                { label: "Inversiones", value: "Inversiones" },
                { label: "Regalos", value: "Regalos" },
                { label: "Otros", value: "Otros" },   
            ]
        const found = cats.find(cat => cat.value === editingFields.categoria)
        return found ? found.label : "Seleccionar..."
    }

    const categoriesDetail = selectedTransaccion?.tipo.toLowerCase() === 'gasto' ? 
        [
            { label: "Servicios", value: "Servicios" },
            { label: "Entretenimiento", value: "Entretenimiento" },
            { label: "Despensa", value: "Despensa" },
            { label: "Transporte", value: "Transporte" },
            { label: "Otros", value: "Otros" },
        ] : 
        [
            { label: "Salario", value: "Salario" },
            { label: "Inversiones", value: "Inversiones" },
            { label: "Regalos", value: "Regalos" },
            { label: "Otros", value: "Otros" },   
        ]

    const handleSelectCategoryDetail = (value) => {
        handleUpdateField('categoria', value)
        setShowCategoryModalDetail(false)
    }

    const handleSelectTypeDetail = (value) => {
        handleUpdateField('tipo', value)
    }

    const handleSaveChanges = async () => {
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
            handleCloseDetailModal()
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
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            if (!selectedTransaccion) return
                            await controller.eliminarTransaccion(selectedTransaccion.id)
                            Alert.alert('Éxito', 'Transacción eliminada correctamente')
                            handleCloseDetailModal()
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

        <View style={styles.mainContainer}>
            <View style={styles.filtrosContainer}>
                {/* <Text style={styles.montoText}>FILTROS</Text> */}

                {/* PICKER Y EL CALEDNARIO */}

                <Text>Categoría: </Text>
                <TouchableOpacity onPress={() => setShowCategoryModal(true)} style={styles.fechaSelectContainer}>
                    <TextInput
                        value={getCategoryLabel()}
                        placeholder="Seleccionar..."
                        placeholderTextColor="black"
                        editable={false}       
                        pointerEvents="none" 
                        numberOfLines={1}
                        ellipsizeMode="tail"   
                    />
                </TouchableOpacity>

                <Modal
                    visible={showCategoryModal}
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
                                    onPress={() => handleSelectCategory(cat.value)}
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
                                onPress={() => setShowCategoryModal(false)}
                            >
                                <Text style={styles.cerrarModalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <Text> Fecha: </Text>
                <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.fechaSelectContainer}>
                    <TextInput
                        value={filtroFecha}
                        placeholder=" dd/mm/aaaa"
                        placeholderTextColor="black"
                        editable={false}       
                        pointerEvents="none"   
                    />
                </TouchableOpacity>
                {showCalendar && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="calendar"
                        onChange={(event, selectedDate) => {
                            setShowCalendar(false);

                            if (selectedDate) {
                                const f = selectedDate.toLocaleDateString("es-MX");
                                setFiltroFecha(f);
                            }
                        }}
                    />
                )}
                {filtroFecha !== "" && (
                    <Pressable
                        onPress={() => setFiltroFecha("")}
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
                )}
            </View>




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

                {/* <Text style={styles.fecha2Texto}>28 de Septiembre de 2025</Text> */}

                {/* <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Hogar</Text>
                        <Text style={styles.comentarioText}>Pago de luz</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $500</Text>
                        <Text style={styles.comentarioText}>14 Feb 2025</Text>
                    </View>
                </View>


                <Text style={styles.fecha2Texto}>23 de Septiembre de 2025</Text>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Hogar</Text>
                        <Text style={styles.comentarioText}>Pago de internet</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $420</Text>
                    </View>
                </View>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Comida</Text>
                        <Text style={styles.comentarioText}>Supermercado</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $1,200</Text>
                    </View>
                </View>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Transporte</Text>
                        <Text style={styles.comentarioText}>Gasolina</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $350</Text>
                    </View>
                </View>

                <Text style={styles.fecha2Texto}>7 de Agosto de 2025</Text>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Entretenimiento</Text>
                        <Text style={styles.comentarioText}>Cine</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $280</Text>
                    </View>
                </View> */}


                {/* <Text>{screen}</Text>
                <Text>{fecha}</Text>  */}               

            </View>
        </View>

        <Modal
            visible={showDetailModal}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCloseDetailModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.detallesModalContent}>
                    <Text style={styles.detallesModalTitulo}>Detalles de Transacción</Text>

                    <View style={styles.detallesFieldContainer}>
                        <Text style={styles.detallesFieldLabel}>Monto:</Text>
                        <TextInput
                            style={styles.detallesFieldInput}
                            value={editingFields.monto}
                            onChangeText={(text) => handleUpdateField('monto', text)}
                            keyboardType="decimal-pad"
                            placeholder="0.00"
                        />
                    </View>

                    <View style={styles.detallesFieldContainer}>
                        <Text style={styles.detallesFieldLabel}>Tipo:</Text>
                        <View style={styles.tipoButtonsContainer}>
                            <TouchableOpacity 
                                style={[
                                    styles.tipoButton,
                                    editingFields.tipo === 'Gasto' && styles.tipoButtonSelected
                                ]}
                                onPress={() => handleSelectTypeDetail('Gasto')}
                            >
                                <Text style={[
                                    styles.tipoButtonText,
                                    editingFields.tipo === 'Gasto' && styles.tipoButtonTextSelected
                                ]}>
                                    Gasto
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styles.tipoButton,
                                    editingFields.tipo === 'Ingreso' && styles.tipoButtonSelected
                                ]}
                                onPress={() => handleSelectTypeDetail('Ingreso')}
                            >
                                <Text style={[
                                    styles.tipoButtonText,
                                    editingFields.tipo === 'Ingreso' && styles.tipoButtonTextSelected
                                ]}>
                                    Ingreso
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detallesFieldContainer}>
                        <Text style={styles.detallesFieldLabel}>Categoría:</Text>
                        <TouchableOpacity 
                            onPress={() => setShowCategoryModalDetail(true)} 
                            style={styles.fechaSelectContainer}
                        >
                            <TextInput
                                value={getCategoryLabelDetail()}
                                placeholder="Seleccionar..."
                                placeholderTextColor="black"
                                editable={false}
                                pointerEvents="none"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={showCategoryModalDetail}
                        transparent={true}
                        animationType="fade"
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitulo}>Seleccionar Categoría</Text>
                                {categoriesDetail.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.categoryOpcion}
                                        onPress={() => handleSelectCategoryDetail(cat.value)}
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
                                    onPress={() => setShowCategoryModalDetail(false)}
                                >
                                    <Text style={styles.cerrarModalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.detallesFieldContainer}>
                        <Text style={styles.detallesFieldLabel}>Fecha:</Text>
                        <TouchableOpacity 
                            onPress={() => setShowDatePickerDetail(true)} 
                            style={styles.fechaSelectContainer}
                        >
                            <TextInput
                                value={editingFields.fecha}
                                placeholder="dd/mm/aaaa"
                                placeholderTextColor="black"
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                    </View>

                    {showDatePickerDetail && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="calendar"
                            onChange={(event, selectedDate) => {
                                setShowDatePickerDetail(false);
                                if (selectedDate) {
                                    const f = selectedDate.toLocaleDateString("es-MX");
                                    handleUpdateField('fecha', f);
                                }
                            }}
                        />
                    )}

                    <View style={styles.detallesFieldContainer}>
                        <Text style={styles.detallesFieldLabel}>Descripción:</Text>
                        <TextInput
                            style={styles.detallesFieldInput}
                            value={editingFields.descripcion}
                            onChangeText={(text) => handleUpdateField('descripcion', text)}
                            placeholder="Agregar descripción"
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.detallesButtonsContainer}>
                        <TouchableOpacity 
                            style={styles.guardarButton}
                            onPress={handleSaveChanges}
                        >
                            <Text style={styles.guardarButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={handleDeleteTransaccion}
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={styles.cerrarDetailButton}
                        onPress={handleCloseDetailModal}
                    >
                        <Text style={styles.cerrarDetailButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
      
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
        borderRadius: 10,
    },
    filtrosContainer: {
        flex: 1,
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
        marginBottom: 10,
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
        backgroundColor: '#f4f4f4ff',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
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
        borderRadius: 10,
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    modalTitulo: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
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
        color: 'rgba(110, 139, 201, 1)',
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
    detallesModalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '85%',
        maxHeight: '90%',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    detallesModalTitulo: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    detallesFieldContainer: {
        marginBottom: 15,
    },
    detallesFieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    detallesFieldInput: {
        backgroundColor: '#f4f4f4ff',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
    },
    detallesButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    guardarButton: {
        flex: 1,
        backgroundColor: 'rgba(110, 139, 201, 1)',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },
    guardarButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#e74c3c',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    cerrarDetailButton: {
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        alignItems: 'center',
    },
    cerrarDetailButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    tipoButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    tipoButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#f4f4f4ff',
    },
    tipoButtonSelected: {
        borderColor: 'rgba(110, 139, 201, 1)',
        backgroundColor: 'rgba(110, 139, 201, 1)',
    },
    tipoButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    tipoButtonTextSelected: {
        color: 'white',
    },
})