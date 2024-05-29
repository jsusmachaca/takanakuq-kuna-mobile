import { TextInput, View, TouchableOpacity, Text, Alert } from 'react-native' 
import { useState } from 'react'
import { styles } from '../styles/formStyles'

export const FormRegister = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [names, setNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <View style={styles.formContainerRegister}>
      <View style={styles.formulario}>
        <TextInput 
          placeholder='Ingrese un nombre de usuario' 
          style={styles.loginInput}
          returnKeyType='next'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput 
          placeholder='Ingrese un correo electrónico' 
          style={styles.loginInput}
          returnKeyType='next'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          placeholder='Ingrese sus nombres' 
          style={styles.loginInput} 
          returnKeyType='next'
          value={names}
          onChangeText={setNames}
        />
        <TextInput 
          placeholder='Ingrese sus apellidos' 
          style={styles.loginInput} 
          returnKeyType='next'
          value={lastNames}
          onChangeText={setLastNames}
        />
        <TextInput 
          placeholder='Ingrese una contraseña' 
          style={styles.loginInput} 
          returnKeyType='next'
          value={password}
          onChangeText={setPassword}
        />
        <TextInput 
          placeholder='Confirme su contraseña' 
          style={styles.loginInput} 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>              
      </View>
    </View>
  )
}
