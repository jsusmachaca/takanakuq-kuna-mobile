import { TextInput, View, TouchableOpacity, Text, Alert } from 'react-native' 
import { useState, useCallback } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'
import { LoadingModal } from './LoadingModal'
import { jwtDecode } from 'jwt-decode'
import { renderError } from '../utils/renderError'

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
  const [errorReq, setErrorReq] = useState('')
  
  const validations = useCallback(() => {
    let tempErrors = {}

    if (!username) tempErrors.usernameError = 'Debe escribir un nombre de Usuario'
    if (!email) tempErrors.emailError = 'Debe escribir un Email'
    if (!names) tempErrors.namesError = 'Debe escribir un Nombre'
    if (!lastNames) tempErrors.lastNamesError = 'Debe escribir un Apellido'
    if (!password) tempErrors.passwordError = 'Debe escribir una Contraseña'
    if (!confirmPassword) tempErrors.confError = 'Debe escribir una Contraseña'
    if (password !== confirmPassword) tempErrors.confError = 'Su contraseña no coincide'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }, [username, email, names, lastNames, password, confirmPassword])

  const handleRegister = useCallback(async () => {
    if (!validations()) {
      return
    }

    try {
      setIsLoading(true)
      const response = await apiClient.post('/api/user/register', {
        first_name: names.trim(),
        last_name: lastNames.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password,
        confirm_password: confirmPassword
      })

      if (response) {
        const loginResponse = await apiClient.post('/api/user/login', {
          username: username.trim(),
          password: password
        })

        if (loginResponse) {
          const decodedToken = jwtDecode(loginResponse.data.access_token)
          const is_admin = decodedToken.is_admin || false
          const is_staff = decodedToken.is_staff || false
          
          await db.runAsync(`INSERT INTO user (id, username, token, is_admin, is_staff) VALUES (?, ?, ?, ?, ?);`, [
            decodedToken.user_id,
            username.trim(), 
            loginResponse.data.access_token,
            is_admin,
            is_staff
          ])
          console.log('Insertion successfully')
          navigation.navigate('Profile')
        }
      }
    } catch (err) {
      console.error(err)
      if (err.response && err.response.data) {
        if (err.response.data.error === 'the user you are trying to register already exists') {
          setErrorReq('La cuenta que estás tratando de registrar ya existe. Por favor inicia sesión')
        } else {
          Alert.alert('Error', 'Lo siento, hubo un problema con nuestros servidores. Por favor, inténtalo nuevamente en unos momentos.')
        }
      } else {
        Alert.alert('Error', 'Lo siento, hubo un problema con nuestros servidores. Por favor, inténtalo nuevamente en unos momentos.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [names, lastNames, username, email, password, confirmPassword, db, navigation])

  return (
    <View style={styles.formContainerRegister}>
      <LoadingModal isLoading={isLoading} />

      <View style={styles.formulario}>
        {renderError(errorReq)}
        {renderError(errors.namesError)}
        {renderError(errors.lastNamesError)}
        {renderError(errors.usernameError)}
        {renderError(errors.emailError)}
        {renderError(errors.passwordError)}
        {renderError(errors.confError)}
        <TextInput 
          placeholder='Ingrese sus Nombres'
          style={[styles.loginInput, errors.namesError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          value={names}
          onChangeText={setNames}
        />
        <TextInput 
          placeholder='Ingrese sus Apellidos'
          style={[styles.loginInput, errors.lastNamesError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          value={lastNames}
          onChangeText={setLastNames}
        />
        <TextInput 
          placeholder='Ingrese un Nombre de Usuario'
          style={[styles.loginInput, errors.usernameError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder='Ingrese un Correo Electrónico'
          style={[styles.loginInput, errors.emailError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          placeholder='Ingrese un Contraseña'
          style={[styles.loginInput, errors.passwordError ? { borderWidth: 1, borderColor: '#CD0A0A' } : {}]}
          returnKeyType='next'
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput 
          placeholder='Confirme su Contraseña'
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
