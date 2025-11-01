import { StyleSheet, Text, View } from 'react-native'

export default function TransaccionesScreen() {
  return (
    <View style={styles.container}>

        {/* TITULO */}
        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>TRANSACCIONES</Text>
        </View>

        {/* BOTONES GASTOS INGERSOS */}
        <View style={styles.selectorContainer}>
            <View style={styles.gastosBoton}>
                <Text style={styles.titulo}>GASTOS</Text>
            </View>

            <View style= {styles.ingresosBoton}>
                <Text style={styles.titulo}>INGRESOS</Text>
            </View>
        </View>


        {/* MAIN */}
        <View style={styles.mainContainer}>

            <View style={styles.fechaContainer}>
                <View style={styles.fechaPressable}>
                    <Text style={styles.fechaTexto}>DÍA</Text>
                </View>
                <View style={styles.fechaPressable}>
                    <Text style={styles.fechaTexto}>MES</Text>
                </View>
                <View style={styles.fechaPressable}>
                    <Text style={styles.fechaTexto}>AÑO</Text>
                </View>
            </View>




            <View style={styles.transaccionesContainer}></View>
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
        fontFamily: 'Inter',
    },
    transaccionesContainer: {
        flex: 10,
        /* backgroundColor: '#c8b5b5ff',   */      
    },

})