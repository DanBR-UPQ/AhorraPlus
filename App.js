import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import DatabaseService from './database/DatabaseService';

import DrawerLateral from './components/DrawerLateral';
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

function ScreenWithSidebar({ component: Component, navigation, route, ...rest }) {
  return (
    <>
      <Component navigation={navigation} route={route} {...rest} />
      <DrawerLateral navigation={navigation} currentRoute={route.name} />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      await DatabaseService.initialize();
    };
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen">
          {(props) => <ScreenWithSidebar component={HomeScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="TestScreen">
          {(props) => <ScreenWithSidebar component={TestScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TransaccionesScreen">
          {(props) => <ScreenWithSidebar component={TransaccionesScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="GraficosScreen">
          {(props) => <ScreenWithSidebar component={GraficosScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PresupuestoScreen">
          {(props) => <ScreenWithSidebar component={PresupuestoScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgregarPresupuestoScreen">
          {(props) => <ScreenWithSidebar component={AgregarPresupuestoScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EditarPresupuestoScreen">
          {(props) => <ScreenWithSidebar component={EditarPresupuestoScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RegistroIngresosScreen">
          {(props) => <ScreenWithSidebar component={RegistroIngresosScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EditarRegistroScreen">
          {(props) => <ScreenWithSidebar component={EditarRegistroScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PagosScreen">
          {(props) => <ScreenWithSidebar component={PagosScreen} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Crearpagos">
          {(props) => <ScreenWithSidebar component={Crearpagos} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Detallespagos">
          {(props) => <ScreenWithSidebar component={Detallespagos} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EditarPago">
          {(props) => <ScreenWithSidebar component={EditarPago} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CrearScreen">
          {(props) => <ScreenWithSidebar component={CrearScreen} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}