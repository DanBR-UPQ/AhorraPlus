import { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

export default function TransaccionesScreen() {
    const [screen, setScreen] = useState('gastos')
    const [fecha, setFecha] = useState('dia')

  return (
    <View style={styles.container}>

        {/* TITULO */}
        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>TRANSACCIONES</Text>
        </View>

        {/* BOTONES GASTOS INGERSOS */}
        <View style={styles.selectorContainer}>
            
            <View style={styles.gastosBoton}>
                <Pressable onPress={() => setScreen('gastos')}>
                    <Text style={styles.titulo}>GASTOS</Text>
                </Pressable>
            </View>

            <View style= {styles.ingresosBoton}>
                <Pressable onPress={() => setScreen('ingresos')}>
                    <Text style={styles.titulo}>INGRESOS</Text>
                </Pressable>
            </View>
        </View>


        {/* MAIN */}
        <View style={styles.mainContainer}>

            <View style={styles.fechaContainer}>
                <View style={styles.fechaPressable}>
                    <Pressable onPress={() => setFecha('dia')}><Text style={styles.fechaTexto}>DÍA</Text></Pressable>
                </View>
                <View style={styles.fechaPressable}>
                    <Pressable onPress={() => setFecha('mes')}><Text style={styles.fechaTexto}>MES</Text></Pressable>
                </View>
                <View style={styles.fechaPressable}>
                    <Pressable onPress={() => setFecha('anio')}><Text style={styles.fechaTexto}>AÑO</Text></Pressable>
                </View>
            </View>




            <View style={styles.transaccionesContainer}>


                <Text>{screen}</Text>
                <Text>{fecha}</Text>

                <Text style={styles.fecha2Texto}>28 de Septiembre de 2025</Text>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Hogar</Text>
                        <Text style={styles.comentarioText}>Pago de luz</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $500</Text>
                    </View>
                </View>

            </View>
        </View>
      
    </View>
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
        height: '10%',
        /* backgroundColor: 'gray', */
        alignItems: 'center',
        justifyContent: 'end',
    },
    titulo: {
        color: 'white',
        fontFamily: 'Inter',
    },
    selectorContainer: {
        width: '60%',
        height: '5%',
        flexDirection: 'row',
        paddingBottom: 5,
        /* backgroundColor: '#9b9898ff', */
    },
    gastosBoton: {
        flex: 1,
        justifyContent: 'end',
    },
    ingresosBoton: {
        flex: 1,
        justifyContent: 'end',
        alignItems: 'end',
    },

    mainContainer: {
        width: '90%',
        height: '80%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },
    fechaContainer: {
        flex: 1,
        /* backgroundColor: '#ac9a9aff', */
        borderBottomWidth: 3,
        borderBottomColor: '#9F9393',
        flexDirection: 'row',
    },
    fechaPressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fechaTexto: {
        color: '#42688eff',
        /* fontFamily: 'Inter', */
    },
    transaccionesContainer: {
        flex: 10,
        alignItems: 'center',
        /* backgroundColor: '#c8b5b5ff',   */      
    },

    fecha2Texto: {
        color: 'rgba(159, 147, 147, 1)',
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginBottom: 5,
        marginStart: 10,
    },

    elemContainer: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgba(134, 166, 201, 0.39)',
        borderRadius: 20,
        flexDirection: 'row',
    },
    elemIzq: {
        flex: 1,
        justifyContent: 'center',
        marginStart: 15,
        /* backgroundColor: 'blue',  */
    },
    elemDer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'end',
        marginEnd: 15,
    },
    categoriaText: {
        /* fontFamily: 'Inter', */
        fontWeight: '700',
        fontSize: 16,
    },
    comentarioText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 15,
        color: 'rgba(107, 101, 101, 1)',
    },
    montoText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 18,
    },

})