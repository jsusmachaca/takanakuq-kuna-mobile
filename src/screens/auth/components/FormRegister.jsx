import { TextInput, View, TouchableOpacity, Text, Alert } from 'react-native' 
import { useState, useCallback } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'
import { LoadingModal } from './LoadingModal'
import { jwtDecode } from 'jwt-decode'

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
    let tempErrors = {};

    if (!username) tempErrors.usernameError = 'Debe escribir un Nombre de Usuario'
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

        let is_admin = false
        let is_staff = false

        if (loginResponse) {
          const decodedToken = jwtDecode(loginResponse.data.access_token)
          is_admin = decodedToken.is_admin || false
          is_staff = decodedToken.is_staff || false
        }

        await db.runAsync(`INSERT INTO user (username, token, is_admin, is_staff) VALUES (?, ?, ?, ?);`, [
          username.trim(), 
          loginResponse.data.access_token,
          is_admin,
          is_staff
        ])
        console.log('Insertion successfully')
        navigation.navigate('Profile')
      }
    } catch (err) {
      console.error(err)
      if (err.response && err.response.data) {
        if (err.response.data === 'the user you are trying to register already exists') {
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
        {
          errorReq.length !== 0 && (
            <Text style={{ marginBottom: 10, fontSize: 17, color: '#CD0A0A' }}>{ errorReq }</Text>
          )
        }
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
