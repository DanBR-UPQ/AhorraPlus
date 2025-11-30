import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

export default function PagosScreen() {
  const [pagos, setPagos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    cargarPagos();
    const unsubscribe = navigation.addListener('focus', cargarPagos);
    return unsubscribe;
  }, [navigation]);

  const cargarPagos = async () => {
    try {
      const data = await DatabaseService.getAllPagos();
      setPagos(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los pagos');
    }
  };

  const eliminarPago = async (id) => {
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
              cargarPagos();
              Alert.alert('Eliminado', 'El pago fue eliminado correctamente');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'No se pudo eliminar el pago');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.pagos}>
      <View style={styles.izquierda}>
        <Text style={styles.concepto}>{item.nombre}</Text>
        <Text style={styles.tipo}>${item.monto} - {item.metodo}</Text>
      </View>
      <View style={styles.derecha}>
        <TouchableOpacity onPress={() => navigation.navigate('Detallespagos', { id: item.id })}>
          <Text style={styles.textoBoton}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditarPago', { id: item.id })}>
          <Text style={[styles.textoBoton, { marginLeft: 10 }]}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarPago(item.id)}>
          <Text style={[styles.textoBoton, { marginLeft: 10 }]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.fondo}>
      <View style={styles.cuadroArriba}>
        <Text style={styles.letra}>Pagos</Text>
      </View>

      <Text style={styles.total}>Total: ${pagos.reduce((acc, p) => acc + p.monto, 0)}</Text>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('Crearpagos')}
      >
        <Text style={styles.textoBoton}>+ Crear</Text>
      </TouchableOpacity>

      <FlatList
        data={pagos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cuadroArriba: {
    backgroundColor: '#5483b3',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo: {
    backgroundColor: '#052659',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  letra: {
    fontSize: 30,
    color: 'white',
  },
  pagos: {
    width: '85%',
    height: 60,
    backgroundColor: '#3aa0b3',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  concepto: {
    marginHorizontal: 15,
    marginBottom: 5,
    marginTop: 10,
    color: '#052659',
    fontSize: 15,
  },
  tipo: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
  },
  izquierda: {
    flexDirection: 'column',
  },
  derecha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  botonAgregar: {
    backgroundColor: '#3aa0b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});
