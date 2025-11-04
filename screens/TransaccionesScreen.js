import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native'

export default function TransaccionesScreen() {
    const [screen, setScreen] = useState('gastos')
    const [fecha, setFecha] = useState('dia')

  return (
    <ImageBackground 
    source={require('../assets/fondoTransacciones.png')}
    resizeMode='cover'
    style={styles.container}
    >

        
        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>TRANSACCIONES</Text>
        </View>

        
        <View style={styles.selectorContainer}>
            
            <View style={styles.gastosBoton}>
                <Pressable onPress={() => setScreen('gastos')}>
                    <Text style={styles.titulo2}>GASTOS</Text>
                </Pressable>
            </View>

            <View style= {styles.ingresosBoton}>
                <Pressable onPress={() => setScreen('ingresos')}>
                    <Text style={styles.titulo2}>INGRESOS</Text>
                </Pressable>
            </View>
        </View>


        
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


                <Text style={styles.fecha2Texto}>23 de Septiembre de 2025</Text>

                <View style={styles.elemContainer}>
                    <View style={styles.elemIzq}>
                        <Text style={styles.categoriaText}>Hogar</Text>
                        <Text style={styles.comentarioText}>Pago de luz</Text>
                    </View>
                    <View style={styles.elemDer}>
                        <Text style={styles.montoText}> $500</Text>
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
                </View>


                {/* <Text>{screen}</Text>
                <Text>{fecha}</Text>  */}               

            </View>
        </View>
      
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
        fontSize: 13,
        /* fontFamily: 'Inter', */
    },
    transaccionesContainer: {
        flex: 15,
        alignItems: 'center',
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
        height: 50,
        backgroundColor: 'rgba(148, 154, 177, 100)',
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
        /* backgroundColor: 'red', */
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
        color: 'rgba(107, 101, 101, 1)',
    },
    montoText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 16,
    },

})