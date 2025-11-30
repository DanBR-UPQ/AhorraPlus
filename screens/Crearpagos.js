import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

export default function Crearpagos() {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [metodo, setMetodo] = useState('');
  const navigation = useNavigation();

  const guardarPago = async () => {
    if (!nombre || !monto || !fecha || !metodo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await DatabaseService.addPago(nombre, parseFloat(monto), fecha, metodo);
      Alert.alert('Éxito', 'Pago agregado correctamente');

      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('PagosScreen');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar el pago');
    }
  };

  return (
    <View style={styles.fondo}>
      <View style={styles.cuadroArriba}>
        <Text style={styles.letra}>Agregar Pago</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del pago"
          placeholderTextColor="#ccc"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Monto"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha (Año-Mes-Día)"
          placeholderTextColor="#ccc"
          value={fecha}
          onChangeText={setFecha}
        />
        <TextInput
          style={styles.input}
          placeholder="Método de pago"
          placeholderTextColor="#ccc"
          value={metodo}
          onChangeText={setMetodo}
        />

        <TouchableOpacity style={styles.botonGuardar} onPress={guardarPago}>
          <Text style={styles.textoBoton}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#052659',
  },
  cuadroArriba: {
    backgroundColor: '#5483b3',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letra: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  formulario: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  input: {
    backgroundColor: '#3aa0b3',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  botonGuardar: {
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
