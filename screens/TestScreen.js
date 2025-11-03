import { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TransaccionesScreen from './TransaccionesScreen'
import RegistroIngresosScreen from './RegistroIngresosScreen'

export default function TestScreen() {

  const [vist, setVist] = useState('menu')

  switch(vist) {
    case 'tr':
      return <TransaccionesScreen/>
    case 'RegIn':
      return <RegistroIngresosScreen/>
    case 'menu':
      default: 
        return (
          <View style={styles.container}>
            <Text>TestScreen</Text>
            <Button title='Transacciones' onPress={() => setVist('tr')}/>
            <Button title='Registro' onPress={() => setVist('RegIn')}/>
          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})