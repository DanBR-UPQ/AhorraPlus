import { Text, StyleSheet, View, ImageBackground, Image, Pressable, Modal, ScrollView, Dimensions } from 'react-native'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BarChart } from 'react-native-chart-kit'
import { TransaccionController } from '../controllers/TransaccionController'

export default function GraficosScreen({navigation}) {
    const [seleccionado, setSeleccionado] = useState('General')
    const [tiempoSeleccionado, setTiempoSeleccionado] = useState('Día')
    const [transacciones, setTransacciones] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
    const [mesSeleccionado, setMesSeleccionado] = useState('Todos')
    const [modalCategoria, setModalCategoria] = useState(false)
    const [modalMes, setModalMes] = useState(false)

    const controller = useRef(new TransaccionController()).current

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

    const categorias = ['Todas', ...new Set(transacciones.map(t => t.categoria))]
    const meses = ['Todos', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const parseFecha = (f) => {
        const [dia, mes, año] = f.split('/').map(Number)
        return { dia, mes, año }
    }

    const getDatosCategoria = () => {
        const filtradas = categoriaSeleccionada === 'Todas' 
            ? transacciones 
            : transacciones.filter(t => t.categoria === categoriaSeleccionada)
        
        const ingresos = filtradas.filter(t => t.tipo === 'Ingreso').reduce((sum, t) => sum + t.monto, 0)
        const Gastos = filtradas.filter(t => t.tipo === 'Gasto').reduce((sum, t) => sum + t.monto, 0)
        
        return { labels: ['Ingresos', 'Gastos'], datasets: [{ data: [ingresos, Gastos] }] }
    }

    const getDatosMes = () => {
        const idx = meses.indexOf(mesSeleccionado)
        const mesFiltrado = mesSeleccionado === 'Todos' ? null : idx

        const filtradas = mesFiltrado
            ? transacciones.filter(t => {
                const { mes } = parseFecha(t.fecha)
                return mes === mesFiltrado
            })
            : transacciones

        const ingresos = filtradas
            .filter(t => t.tipo === 'Ingreso')
            .reduce((sum, t) => sum + t.monto, 0)

        const gastos = filtradas
            .filter(t => t.tipo === 'Gasto')
            .reduce((sum, t) => sum + t.monto, 0)

        return { labels: ['Ingresos', 'Gastos'], datasets: [{ data: [ingresos, gastos] }] }
    }


    return (
        <ImageBackground 
        source={require('../assets/fondoGraficas.png')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.container}
        >
            <Text style={styles.titulo}>Gráficos</Text>

            {/* <View style={styles.fecha2Container}>
                <Pressable onPress={() => setSeleccionado('General')}>
                    <Text style={[styles.titulo3, seleccionado === 'General' && { textDecorationLine: 'underline' }]}>General</Text>
                </Pressable>
                <Pressable onPress={() => setSeleccionado('Gastos')}>
                    <Text style={[styles.titulo3, seleccionado === 'Gastos' && { textDecorationLine: 'underline' }]}>Gastos</Text>
                </Pressable>
                <Pressable onPress={() => setSeleccionado('Ingresos')}>
                    <Text style={[styles.titulo3, seleccionado === 'Ingresos' && { textDecorationLine: 'underline' }]}>Ingresos</Text>
                </Pressable>               
            </View> */}

            {/*ingresos / gastos por categoría */}
            <View style={styles.grafContainer}>
                <View style={styles.fechaContainer}>
                    <Text style={styles.titulo2}>Por Categoría</Text>
                    <Pressable onPress={() => setModalCategoria(true)}>
                        <Text style={styles.titulo2}>{categoriaSeleccionada} ▼</Text>
                    </Pressable>
                </View>
                
                <BarChart
                    data={getDatosCategoria()}
                    width={Dimensions.get('window').width * 0.85}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#949AB1',
                        backgroundGradientFrom: '#949AB1',
                        backgroundGradientTo: '#949AB1',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    fromZero={true}
                    style={{ borderRadius: 10 }}
                />
            </View>

            {/*  ingresos / Gastos por mes */}
            <View style={styles.grafContainer}>
                <View style={styles.fechaContainer}>
                    <Text style={styles.titulo2}>Por Mes</Text>
                    <Pressable onPress={() => setModalMes(true)}>
                        <Text style={styles.titulo2}>{mesSeleccionado} ▼</Text>
                    </Pressable>
                </View>
                
                <BarChart
                    data={getDatosMes()}
                    width={Dimensions.get('window').width * 0.85}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#949AB1',
                        backgroundGradientFrom: '#949AB1',
                        backgroundGradientTo: '#949AB1',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    fromZero={true}
                    style={{ borderRadius: 10 }}
                />
            </View>

            <Modal visible={modalCategoria} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setModalCategoria(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {categorias.map(cat => (
                                <Pressable key={cat} onPress={() => { setCategoriaSeleccionada(cat); setModalCategoria(false) }} style={styles.modalItem}>
                                    <Text style={styles.modalText}>{cat}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>

            <Modal visible={modalMes} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setModalMes(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {meses.map(mes => (
                                <Pressable key={mes} onPress={() => { setMesSeleccionado(mes); setModalMes(false) }} style={styles.modalItem}>
                                    <Text style={styles.modalText}>{mes}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>

            {/* <Text style={styles.fecha2Texto}>28 de Septiembre de 2025</Text>

            <View style={styles.elemContainer}>
                <View style={styles.elemIzq}>
                    <Text style={styles.categoriaText}>Hogar</Text>
                    <Text style={styles.comentarioText}>Pago de luz</Text>
                </View>
                <View style={styles.elemDer}>
                    <Text style={styles.montoText}> $500</Text>
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        /* backgroundColor: 'rgba(55, 76, 146, 1)', */
        /* backgroundColor: 'red' */
    },

    titulo: {
        color: 'rgba(68, 65, 65, 1)',
        fontSize: 18,
        fontWeight: 700,
        marginTop: 15,
        /* fontFamily: 'Inter', */
    },
    titulo2: {
        color: 'white',
        fontSize: 15,
        fontWeight: 400,
        /* fontFamily: 'Inter', */
    },
    titulo3: {
        color: '#26208fff',
        fontSize: 15,
        fontWeight: 600,
        /* fontFamily: 'Inter', */
    },
    fecha2Container: {
        alignItems: 'center',
        gap: 50,
        flexDirection: 'row',
        marginTop: 10,
        /* marginBottom: 5, */
        /* backgroundColor: 'blue', */
    },

    grafContainer: {
        width: '90%',
        height: '35%',
        borderRadius: 10,
        backgroundColor: 'rgba(148, 154, 177, 1)',
        alignItems: 'center',
        paddingTop: 10,
        marginTop: 10,
        /* justifyContent: 'center', */
    },
    fechaContainer: {
        alignItems: 'center',
        gap: 50,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        /* backgroundColor: 'blue', */
    },
    graficaImage: {
        flex: 1, 
        width: '100%', 
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '70%',
        maxHeight: '50%',
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalText: {
        fontSize: 16,
        color: '#444',
    },

    fecha2Texto: {
        color: 'rgba(159, 147, 147, 1)',
        fontWeight: '700',
        alignSelf: 'flex-start',
        fontSize: 10,
        marginBottom: 10,
        marginTop: 5,
        marginStart: 30,
    },    

    elemContainer: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgba(134, 166, 201, 0.39)',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    elemIzq: {
        flex: 1,
        justifyContent: 'center',
        marginStart: 10,
        gap: 5,
        /* backgroundColor: 'blue',  */
    },
    elemDer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginEnd: 15,
    },
    categoriaText: {
        /* fontFamily: 'Inter', */
        fontWeight: '700',
        fontSize: 15,
    },
    comentarioText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 11,
        color: 'rgba(68, 65, 65, 1)',
    },
    montoText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 16,
    },    
})