import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

export default function Crearpagos() {
  const [form, setForms] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    monto: '',
  });

  return (
    <View style={styles.background}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Crear próximo pago</Text>

        <TextInput
          placeholder="Nombre del pago"
          value={form.nombre}
          onChangeText={(texto) => setForms({ ...form, nombre: texto })}
          style={styles.entrada}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Fecha del pago"
          value={form.fecha}
          onChangeText={(texto) => setForms({ ...form, fecha: texto })}
          style={styles.entrada}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Hora del pago"
          value={form.hora}
          onChangeText={(texto) => setForms({ ...form, hora: texto })}
          style={styles.entrada}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Monto del pago"
          value={form.monto}
          onChangeText={(texto) => setForms({ ...form, monto: texto })}
          style={styles.entrada}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>Guardar Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#021024',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor: {
    width: '90%',
    backgroundColor: '#7DA0CA',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
