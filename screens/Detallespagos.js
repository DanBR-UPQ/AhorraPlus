import { View, Text, StyleSheet } from 'react-native';

export default function DetallesPago() {
  return (
    <View style={styles.background}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Detalles</Text>

        <View style={styles.seccion}>
          <Text style={styles.etiqueta}>Pago:</Text>
          <Text style={styles.valor}>Pagar Luz</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.etiqueta}>Fecha:</Text>
          <Text style={styles.valor}>28 de Octubre de 2025</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.etiqueta}>Hora:</Text>
          <Text style={styles.valor}>1:00 pm</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.etiqueta}>Monto de pago:</Text>
          <Text style={styles.valor}>$500</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#052659',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },
    contenedor: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#052659',
        marginBottom: 20,
        textAlign: 'center',
    },
    seccion: {
        marginBottom: 15,
    },
    etiqueta: {
        fontSize: 16,
        color: '#5483B3',
        fontWeight: 'bold',
    },
    valor: {
        fontSize: 18,
        color: '#021024',
        marginTop: 5,
    },
});