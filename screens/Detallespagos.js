import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

export default function Detallespagos() {
  const [pago, setPago] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  useEffect(() => {
    cargarPago();
  }, []);

  const cargarPago = async () => {
    try {
      const pagos = await DatabaseService.getAllPagos();
      const encontrado = pagos.find(p => p.id === id);
      if (!encontrado) {
        Alert.alert('Error', 'No se encontró el pago');
        return;
      }
      setPago(encontrado);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cargar el pago');
    }
  };

  const eliminarPago = async () => {
    Alert.alert(
      '¿Eliminar pago?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await DatabaseService.deletePago(id);
              Alert.alert('Eliminado', 'Pago eliminado correctamente');
              navigation.navigate('PagosScreen');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'No se pudo eliminar el pago');
            }
          },
        },
      ]
    );
  };

  if (!pago) {
    return (
      <View style={styles.fondo}>
        <View style={styles.cuadroArriba}>
          <Text style={styles.letra}>Detalle del Pago</Text>
        </View>
        <Text style={styles.letra}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.fondo}>
      <View style={styles.cuadroArriba}>
        <Text style={styles.letra}>Detalle del Pago</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.valor}>{pago.nombre}</Text>

        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.valor}>${pago.monto}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.valor}>{pago.fecha}</Text>

        <Text style={styles.label}>Método:</Text>
        <Text style={styles.valor}>{pago.metodo}</Text>
      </View>

      <TouchableOpacity style={styles.botonEliminar} onPress={eliminarPago}>
        <Text style={styles.textoBoton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#052659',
    paddingTop: 10,
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
  card: {
    backgroundColor: '#3aa0b3',
    marginHorizontal: 30,
    marginTop: 30,
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
    fontWeight: '600',
  },
  valor: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
  },
  botonEliminar: {
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
