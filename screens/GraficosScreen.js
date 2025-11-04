import { Text, StyleSheet, View } from 'react-native'

export default function GraficosScreen() {
    return (
        <View style={styles.container}>
            <Text>GraficosScreen</Text>

            <View style={styles.grafContainer}>
                <View style={styles.fechaContainer}>
                    <Text>Día</Text>
                    <Text>Mes</Text>
                    <Text>Año</Text>
                </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(55, 76, 146, 1)',
    },




    grafContainer: {
        width: '90%',
        height: '35%',
        borderRadius: 10,
        backgroundColor: 'rgba(148, 154, 177, 1)',
        alignItems: 'center',
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




    fecha2Texto: {
        color: 'rgba(159, 147, 147, 1)',
        fontWeight: '700',
        alignSelf: 'flex-start',
        fontSize: 10,
        marginBottom: 5,
        marginTop: 5,
        marginStart: 30,
    },    

    elemContainer: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgba(134, 166, 201, 0.39)',
        borderRadius: 10,
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
        alignItems: 'end',
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
        color: 'rgba(107, 101, 101, 1)',
    },
    montoText: {
        /* fontFamily: 'Inter', */
        fontWeight: '600',
        fontSize: 16,
    },    
})