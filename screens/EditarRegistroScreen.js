import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, ImageBackground } from 'react-native';

export default function EditarRegistroScreen() {
  const [tipo, setTipo] = useState('Ingreso');
  const [categoria, setCategoria] = useState('Sueldo');
  const [comentario, setComentario] = useState('Pago mensual');
  const [monto, setMonto] = useState('5000');
  const [fecha, setFecha] = useState('04/11/2025');

  const handleAceptar = () => {
    console.log('Registro actualizado:', { tipo, categoria, comentario, monto, fecha });
  };

  const handleCancelar = () => {
    console.log('Edición cancelada');
  };

  const handleEliminar = () => {
    console.log('Registro eliminado');
  };

  return (
    <ImageBackground 
      source={require('../assets/fondoTransacciones.png')} 
      resizeMode='cover' 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
        <View style={styles.titulo1}>
          <Text style={styles.titulo2}>EDITAR REGISTRO</Text>
        </View>

        <View style={styles.pestañasContainer}>
          <Pressable onPress={() => setTipo('Gasto')} style={styles.pestaña}>
            <Text
              style={[
                styles.pestañaTexto,
                tipo === 'Gasto' && styles.pestañaActivaTexto,
              ]}
            >
              GASTOS
            </Text>
            {tipo === 'Gasto' && <View style={styles.subrayado} />}
          </Pressable>

          <Pressable onPress={() => setTipo('Ingreso')} style={styles.pestaña}>
            <Text
              style={[
                styles.pestañaTexto,
                tipo === 'Ingreso' && styles.pestañaActivaTexto,
              ]}
            >
              INGRESOS
            </Text>
            {tipo === 'Ingreso' && <View style={styles.subrayado} />}
          </Pressable>
        </View>

        <View style={styles.Formulario}>
          <Text style={styles.datos}>Categoría</Text>
          <TextInput
            style={styles.inputContainer}
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Categoría"
            placeholderTextColor="#000000ff"
          />

          <Text style={styles.datos}>Comentario</Text>
          <TextInput
            style={[styles.inputContainer, { textAlignVertical: 'top', height: 60 }]}
            value={comentario}
            onChangeText={setComentario}
            placeholder="Comentario"
            placeholderTextColor="#666"
            multiline
          />

          <Text style={styles.datos}>Monto</Text>
          <TextInput
            style={styles.inputContainer}
            value={monto}
            onChangeText={setMonto}
            placeholder="Monto"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />

          <Text style={styles.datos}>Fecha</Text>
          <TextInput
            style={styles.inputContainer}
            value={fecha}
            onChangeText={setFecha}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#666"
          />

          <View style={styles.botonesContainer}>
            <Pressable style={[styles.boton, styles.botonAceptar]} onPress={handleAceptar}>
              <Text style={styles.botonTexto}>Aceptar</Text>
            </Pressable>

            <Pressable style={[styles.boton, styles.botonCancelar]} onPress={handleCancelar}>
              <Text style={styles.botonTexto}>Cancelar</Text>
            </Pressable>

            <Pressable style={[styles.boton, styles.botonEliminar]} onPress={handleEliminar}>
              <Text style={styles.botonTexto}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
  },
  container: {
    /* backgroundColor: 'rgba(50, 110, 155, 0.8)',  */
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
  },
  titulo1: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
  },
  pestañasContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 60,
  },
  pestaña: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  pestañaTexto: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: '700',
  },
  pestañaActivaTexto: {
    color: '#fff',
  },
  subrayado: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    marginTop: 3,
    borderRadius: 2,
  },
  titulo2: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  Formulario: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 120,
  },
  datos: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    backgroundColor: '#E0E0E0',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  boton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 25,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
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
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
