import { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TransaccionesScreen from './TransaccionesScreen'
import LoginScreen from './LoginScreen'

export default function TestScreen() {

  const [vist, setVist] = useState('menu')

  switch(vist) {
    case 'tr':
      return <TransaccionesScreen/>
    case 'Login':
      return<LoginScreen/>
      case 'menu':
      default: 
        return (
          <View style={styles.container}>
            <Text>TestScreen</Text>
            <Button title='Transacciones' onPress={() => setVist('tr')}/>
            <Button title='LoginScreen' onPress={() => setVist('Login')}/>
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