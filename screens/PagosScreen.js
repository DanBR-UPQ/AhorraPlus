import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function PagosProgramados() {
  const [estado, setEstado] = useState({
    luz: true,
    agua: true,
    tarjeta: true,
  });

  return (
    <View style={styles.background}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Pagos programados</Text>

        <TouchableOpacity style={styles.botonCrear}>
          <Text style={styles.textoCrear}>+ Crear</Text>
        </TouchableOpacity>

        {Object.entries(estado).map(([key, value]) => (
          <View key={key} style={styles.filaPago}>
            <Text style={styles.textoPago}>Pagar {key}</Text>
            <Switch
              value={value}
              onValueChange={(nuevo) => setEstado({ ...estado, [key]: nuevo })}
              trackColor={{ false: '#ccc', true: '#007AFF' }}
              thumbColor={value ? '#fff' : '#f4f3f4'}
            />
          </View>
        ))}
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
  },
  contenedor: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#052659',
    marginBottom: 10,
    textAlign: 'center',
  },
  botonCrear: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  textoCrear: {
    fontSize: 16,
    color: '#5483B3',
  },
  filaPago: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textoPago: {
    fontSize: 16,
    color: '#333',
  },
});
