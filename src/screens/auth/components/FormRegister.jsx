import { TextInput, View, TouchableOpacity, Text, Alert } from 'react-native' 
import { useState } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'

export const FormRegister = (props) => {
  const db = useSQLiteContext()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [names, setNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = () => {
    apiClient.post('/api/user/register', {
      first_name: names,
      last_name: lastNames,
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword
    })
      .then (res => {
        console.log(res.data)
        apiClient.post('/api/user/login', {
          username: username,
          password: password
        })
          .then (async res => {
            await db.runAsync(`INSERT INTO user (username, token) 
            VALUES (?, ?);`, 
            [username, res.data.access_token])
            console.log('Insertion successfully')
            props.navigation.navigate('Profile')
          })
          .catch (err => {
            console.log(err)
          })
      })
      .catch (err => {
        console.error(err.response.data)
      })
  }

  return (
    <View style={styles.formContainerRegister}>
      <View style={styles.formulario}>
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
          placeholder='Ingrese un nombre de usuario' 
          style={styles.loginInput}
          returnKeyType='next'
          autoCapitalize='none'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput 
          placeholder='Ingrese un correo electrónico' 
          style={styles.loginInput}
          returnKeyType='next'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          placeholder='Ingrese una contraseña' 
          style={styles.loginInput} 
          returnKeyType='next'
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput 
          placeholder='Confirme su contraseña' 
          style={styles.loginInput} 
          autoCapitalize='none'
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => handleRegister()}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>              
      </View>
    </View>
  )
}
