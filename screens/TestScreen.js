import { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TransaccionesScreen from './TransaccionesScreen'
import LoginScreen from './LoginScreen'
import RegistroIngresosScreen from './RegistroIngresosScreen'
import CrearScreen from './CrearScreen'
import HomeScreen from './HomeScreen'
import GraficosScreen from './GraficosScreen'
import ObjetivosScreen from './ObjetivosScreen'
import Editarpago from './EditarPago'
import EditarRegistroScreen from './EditarRegistroScreen'



import PagosScreen from './PagosScreen'

import Crearpagos from './Crearpagos'
import AngregarObjetivoScreen from './AgregarObjetivoScreen'



export default function TestScreen() {

  const [vist, setVist] = useState('menu')

  switch(vist) {
    case 'tr':
      return <TransaccionesScreen/>
    case 'graf':
      return <GraficosScreen/>
    case 'RegIn':
      return <RegistroIngresosScreen/>
      case 'Login':
      return<LoginScreen/>
      case 'Pagos':
      return<PagosScreen/>
      case 'ed':
      return<Editarpago/>
      case 'er':
      return <EditarRegistroScreen></EditarRegistroScreen>

      case 'CrearPago':
      return<Crearpagos/>

      case 'crear':
        return<CrearScreen/>
      case 'home':
        return<HomeScreen/>
      case 'AgrObj':
        return<AngregarObjetivoScreen/>
      case 'objetivos':
        return<ObjetivosScreen/>





      return<LoginScreen/>
      case 'menu':
      default:
        return (
          <View style={styles.container}>
            <Text>TestScreen</Text>
            <Button title='Transacciones' onPress={() => setVist('tr')}/>
              <Button title='login' onPress={() => setVist('Login')}/>
            <Button title='RegistroIngresos' onPress={() => setVist('RegIn')}/>
            <Button title='crear' onPress={() => setVist('crear')}/>
            <Button title='login' onPress={() => setVist('Login')}/>
            <Button title='home' onPress={() => setVist('home')}/>
            <Button title='Objetivos' onPress={() => setVist('objetivos')}/>
            <Button title='RegistroIngresos' onPress={() => setVist('RegIn')}/>
            < Button title= 'PagosScreen' onPress={() => setVist('Pagos')}/>
            < Button title= 'CrearPago' onPress={() => setVist('CrearPago')}/>
            < Button title= 'Añadir Objetivo' onPress={() => setVist('AgrObj')}/>
            < Button title= 'Gráficas' onPress={() => setVist('graf')}/>
            < Button title= 'editar pago' onPress={() => setVist('ed')}/>
            < Button title= 'editar registro' onPress={() => setVist('er')}/>



          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  }
})