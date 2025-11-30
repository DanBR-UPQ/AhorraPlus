import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import UsuarioController from '../controllers/UsuarioController'
import { useNavigation } from '@react-navigation/native'

export default function ResetPasswordScreen() {
  const [identifier, setIdentifier] = useState('')
  const [code, setCode] = useState('')
  const [nueva, setNueva] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigation = useNavigation()

  const handleReset = async () => {
    try {
      if (!identifier || !code || !nueva) {
        Alert.alert('Error', 'Rellena todos los campos')
        return
      }
      if (nueva !== confirm) {
        Alert.alert('Error', 'Las contraseñas no coinciden')
        return
      }
      const ok = await UsuarioController.resetPassword(identifier.trim(), code.trim(), nueva)
      if (!ok) {
        Alert.alert('Error', 'Código inválido o expirado')
        return
      }
      Alert.alert('Éxito', 'Contraseña restaurada. Inicia sesión con la nueva contraseña.')
      navigation.navigate('LoginScreen')
    } catch (err) {
      Alert.alert('Error', err.message || 'No se pudo cambiar la contraseña')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <TextInput placeholder='Correo o teléfono' style={styles.input} value={identifier} onChangeText={setIdentifier} />
      <TextInput placeholder='Código de recuperación' style={styles.input} value={code} onChangeText={setCode} />
      <TextInput placeholder='Nueva contraseña' secureTextEntry style={styles.input} value={nueva} onChangeText={setNueva} />
      <TextInput placeholder='Confirmar contraseña' secureTextEntry style={styles.input} value={confirm} onChangeText={setConfirm} />
      <Button title='Cambiar contraseña' onPress={handleReset} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#052659' },
  title: { fontSize: 24, color: 'white', marginBottom: 20 },
  input: { width: '100%', backgroundColor: '#f3e3e3e2', padding: 12, marginBottom: 12, borderRadius: 8 }
})
