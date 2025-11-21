import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AgregarPresupuestoScreen from './AgregarPresupuestoScreen';
import Crearpagos from '../screens/Crearpagos';
import CrearScreen from '../screens/CrearScreen';
import EditarPago from '../screens/EditarPago';
import EditarRegistroScreen from '../screens/EditarRegistroScreen';
import GraficosScreen from '../screens/GraficosScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PresupuestoScreen from './PresupuestoScreen';
import PagosScreen from '../screens/PagosScreen';
import RegistroIngresosScreen from '../screens/RegistroIngresosScreen';
import TestScreen from '../screens/TestScreen';
import TransaccionesScreen from '../screens/TransaccionesScreen';
import EditarPresupuestoScreen from './EditarPresupuestoScreen';

export default function BarraLateral() {
  const [barraAbierta, setBarraAbierta] = useState(false);
  const [screen, setScreen] = useState('Inicio');

  const screens = {
    'Inicio': <HomeScreen />,
    'Login': <LoginScreen />,
    'Transacciones': <TransaccionesScreen />,
    'Crear registro': <RegistroIngresosScreen />,
    'Editar registro': <EditarRegistroScreen />,
    'Gráficas': <GraficosScreen />,
    'Pagos': <PagosScreen />,
    'Crear pago': <Crearpagos />,
    'Editar pago': <EditarPago />,
    'Presupuesto': <PresupuestoScreen />,
    'Agregar Presupuesto': <AgregarPresupuestoScreen />,
    'Editar Presupuesto': <EditarPresupuestoScreen/>,
    'Crear nueva cuenta': <CrearScreen />,
    /* 'Test': <TestScreen />, */
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>{screens[screen]}</View>

      <TouchableOpacity
        style={styles.botonContainer}
        onPress={() => setBarraAbierta(!barraAbierta)}
      >
        <Text style={styles.menuBoton}>☰</Text>
      </TouchableOpacity>

      {barraAbierta && (
        <View style={styles.barraContainer}>
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/usuario.png')}
              style={styles.imagenUsuario}
            />
            <Text style={styles.usuarioText}>Usuario</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(screens).map((name) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.menuItem,
                  screen === name && styles.menuItemActivo,
                ]}
                onPress={() => {
                  setScreen(name);
                  setBarraAbierta(false);
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    screen === name && styles.menuTextActivo,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  botonContainer: {
    position: 'absolute',
    top: 25,
    left: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
    borderRadius: 25,
    elevation: 4,
  },
  menuBoton: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  barraContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#000e26',
    paddingTop: 50,
    paddingHorizontal: 15,
    zIndex: 1000,
    elevation: 9,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    marginTop: 20,
    paddingLeft: 5,
  },
  imagenUsuario: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginRight: 10,
  },
  usuarioText: {
    color: 'white',
    fontSize: 16,
  },
  menuItem: {
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  menuItemActivo: {
    backgroundColor: '#4c74a6',
  },
  menuText: {
    color: 'white',
    fontSize: 15,
  },
  menuTextActivo: {
    color: '#e2e8f0',
  },
});
