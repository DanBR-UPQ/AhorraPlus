import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import DatabaseService from './database/DatabaseService'; // importa tu servicio

import BarraLateral from './screens/BarraLateral';
import AgregarPresupuestoScreen from './screens/AgregarPresupuestoScreen';
import Crearpagos from './screens/Crearpagos';
import CrearScreen from './screens/CrearScreen';
import Detallespagos from './screens/Detallespagos';
import EditarPago from './screens/EditarPago';
import EditarPresupuestoScreen from './screens/EditarPresupuestoScreen';
import EditarRegistroScreen from './screens/EditarRegistroScreen';
import GraficosScreen from './screens/GraficosScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import PagosScreen from './screens/PagosScreen';
import PresupuestoScreen from './screens/PresupuestoScreen';
import RegistroIngresosScreen from './screens/RegistroIngresosScreen';
import TestScreen from './screens/TestScreen';
import TransaccionesScreen from './screens/TransaccionesScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      await DatabaseService.initialize();
    };
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BarraLateral" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BarraLateral" component={BarraLateral} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="TransaccionesScreen" component={TransaccionesScreen} />
        <Stack.Screen name="GraficosScreen" component={GraficosScreen} />
        <Stack.Screen name="PresupuestoScreen" component={PresupuestoScreen} />
        <Stack.Screen name="AgregarPresupuestoScreen" component={AgregarPresupuestoScreen} />
        <Stack.Screen name="EditarPresupuestoScreen" component={EditarPresupuestoScreen} />
        <Stack.Screen name="RegistroIngresosScreen" component={RegistroIngresosScreen} />
        <Stack.Screen name="EditarRegistroScreen" component={EditarRegistroScreen} />
        <Stack.Screen name="PagosScreen" component={PagosScreen} />
        <Stack.Screen name="Crearpagos" component={Crearpagos} />
        <Stack.Screen name="Detallespagos" component={Detallespagos} />
        <Stack.Screen name="EditarPago" component={EditarPago} />
        <Stack.Screen name="CrearScreen" component={CrearScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
