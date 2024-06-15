import { TextInput, View, TouchableOpacity, Text, Alert, Modal, ActivityIndicator } from 'react-native' 
import { useState, useCallback } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'
import { LoadingModal } from './LoadingModal'

export const FormRegister = ({ navigation }) => {
  const db = useSQLiteContext()

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [names, setNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  
  const validations = useCallback(() => {
    let tempErrors = {};

    if (!username) {
      tempErrors.usernameError = 'Debe escribir un Nombre de Usuario'
    } 
    if (!email) {
      tempErrors.emailError = 'Debe escribir un Email'
    } 
    if (!names) {
      tempErrors.namesError = 'Debe escribir un Nombre'
    } 
    if (!lastNames) {
      tempErrors.lastNamesError = 'Debe escribir un Apellido'
    } 
    if (!password) {
      tempErrors.passwordError = 'Debe escribir una Contraseña'
    }
    if (!confirmPassword) {
      tempErrors.confError = 'Debe escribir una Contraseña'
    }
    if (password !== confirmPassword) {
      tempErrors.confError = 'Su contraseña no coincide'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }, [username, email, names, lastNames, password, confirmPassword])

  const handleRegister = useCallback(async () => {
    if (!validations()) {
      return;
    }

    try {
      setIsLoading(true)
      const response = await apiClient.post('/api/user/register', {
        first_name: names,
        last_name: lastNames,
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword
      })

      if (response) {
        const loginResponse = await apiClient.post('/api/user/login', {
          username: username,
          password: password
        })

        await db.runAsync(`INSERT INTO user (username, token) VALUES (?, ?);`, [
          username, 
          loginResponse.data.access_token
        ])
        console.log('Insertion successfully')
        navigation.navigate('Profile')
      }
    } catch (err) {
      console.error(err.response?.data || err.message)
    } finally {
      setIsLoading(false)
    }
  }, [names, lastNames, username, email, password, confirmPassword, db, navigation])

  return (
    <View style={styles.formContainerRegister}>
      <LoadingModal isLoading={isLoading} />

      <View style={styles.formulario}>
        <TextInput 
          placeholder={errors.namesError ? errors.namesError : 'Ingrese sus Nombres'}
          placeholderTextColor={errors.namesError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.namesError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          value={names}
          onChangeText={setNames}
        />
        <TextInput 
          placeholder={errors.lastNamesError ? errors.lastNamesError : 'Ingrese sus Apellidos'}
          placeholderTextColor={errors.lastNamesError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.lastNamesError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          value={lastNames}
          onChangeText={setLastNames}
        />
        <TextInput 
          placeholder={errors.usernameError ? errors.usernameError : 'Ingrese un Nombre de Usuario'}
          placeholderTextColor={errors.usernameError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.usernameError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder={errors.emailError ? errors.emailError : 'Ingrese un Correo Electrónico'}
          placeholderTextColor={errors.emailError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.emailError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          placeholder={errors.passwordError ? errors.passwordError : 'Ingrese un Contraseña'}
          placeholderTextColor={errors.passwordError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.passwordError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput 
          placeholder={errors.confError ? errors.confError : 'Confirme su Contraseña'}
          placeholderTextColor={errors.confError ? '#CD0A0A' : '#636363'}
          style={[styles.loginInput, errors.confError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}

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
