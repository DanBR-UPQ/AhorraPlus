import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';

export default function Editarpago() {
  const [form, setForms] = useState({
    nombre: 'Pago de mantenimiento',
    fecha: '2025-11-15',
    hora: '12:00',
    monto: '1500',
  });

  const handleAceptar = () => {
    console.log('Pago actualizado:', form);
  };

  const handleCancelar = () => {
    console.log('Edición cancelada');
  };

  const handleEliminar = () => {
    console.log('Pago eliminado');
  };

  return (
    <ImageBackground
    source={require('../assets/fondoEditarPago.png')}
    resizeMode='cover'
    style={styles.background}  
    >
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Editar pago</Text>

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

        <View style={styles.botonesContainer}>
          <TouchableOpacity style={[styles.boton, styles.botonAceptar]} onPress={handleAceptar}>
            <Text style={styles.textoBoton}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.boton, styles.botonCancelar]} onPress={handleCancelar}>
            <Text style={styles.textoBoton}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.boton, styles.botonEliminar]} onPress={handleEliminar}>
            <Text style={styles.textoBoton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  boton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  botonAceptar: {
    backgroundColor: '#007AFF',
  },
  botonCancelar: {
    backgroundColor: '#888',
  },
  botonEliminar: {
    backgroundColor: '#D9534F',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
