import { Text, StyleSheet, View, ImageBackground, Image } from 'react-native'

export default function GraficosScreen() {
    return (
        <ImageBackground 
        source={require('../assets/fondoGraficas.png')}
        resizeMode='cover'
        style={styles.container}
        >
            <Text style={styles.titulo}>Gráficos</Text>


            <View style={styles.fecha2Container}>
                <Text style={styles.titulo3}>General</Text>
                <Text style={styles.titulo3}>Gastos</Text>
                <Text style={styles.titulo3}>Ingresos</Text>                
            </View>


            <View style={styles.grafContainer}>
                <View style={styles.fechaContainer}>
                    <Text style={styles.titulo2}>Día</Text>
                    <Text style={styles.titulo2}>Mes</Text>
                    <Text style={styles.titulo2}>Año</Text>
                </View>
                
                <Image
                source={require('../assets/graficaTest.png')}
                resizeMode= 'contain'
                style= {styles.graficaImage}
                /> 
            </View>








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
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(55, 76, 146, 1)',
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
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        /* backgroundColor: 'blue', */
    },
    graficaImage: {
        flex: 1, 
        width: '100%', 
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