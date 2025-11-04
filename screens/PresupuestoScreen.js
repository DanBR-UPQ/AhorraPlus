import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';

export default function PresupuestoScreen() {
    return (
    <ImageBackground 
        source={require('../assets/fondoPresupuesto.png')} 
        style={styles.backgroundImage}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

            <View style={styles.titulo1}>
                <Text style={styles.titulo2}>Presupuestos</Text>
            </View>

            <View style={styles.meta}>
                <View style={styles.fondoMeta}>
                    <Text style={styles.metaTexto}>Noviembre</Text>
                </View>

                <View style={styles.contenido}>
                    <Text style={styles.texto}>Pago de sevicios: $1000</Text>
                    <Text style={styles.texto}>Trasporte: $500</Text>
                    <Text style={styles.texto}>Comidas: $1500</Text>
                </View>
            </View>

            <View style={styles.botonCrear}>
                <Text style={styles.botonCrearTexto}>+ Crear</Text>
            </View>

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
});
