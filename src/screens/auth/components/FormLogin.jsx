import { TextInput, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native' 
import { useState, useCallback } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'
import { LoadingModal } from './LoadingModal'

export const FormLogin = ({ navigation }) => {
  const db = useSQLiteContext()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = useCallback(async () => {
    try {
      setIsLoading(true)

      if (username.length === 0 || password.length === 0) {
        setError(true)
        throw new Error('Credentials not provided')
      }
      
      const response = await apiClient.post('/api/user/login', {
        username: username,
        password: password
      })

      if (response) {
        await db.runAsync('INSERT INTO user (username, token) VALUES (?, ?);', [
          username, 
          response.data.access_token
        ])
        console.log('Insertion successfully')
        navigation.navigate('Home')
      }
    } catch (err) {
      setError(true)
      console.error(`Error => ${err.response?.data || err.message}`)
    } finally {
      setIsLoading(false)
    }
  }, [username, password, db, navigation])

  return (
    <View style={styles.formContainer}>
      <LoadingModal isLoading={isLoading} />
      <View style={styles.formulario}>
        {
          error ?
            <Text style={{ marginBottom: 10, fontSize: 17, color: '#CD0A0A' }}>Credenciales incorrectas</Text>
          :
            <></>
        }
        <TextInput 
          placeholder='Ingrese su nombre usuario o correo eletrónico'
          style={[styles.loginInput, error ? { borderWidth: 1, borderColor: '#CD0A0A' } : {} ]}
          returnKeyType='next'
          autoCapitalize='none'
          value={username}
          onChangeText={data => setUsername(data)}
        />
        <TextInput 
          placeholder='Ingrese su contraseña'
          style={[styles.loginInput, error ? { borderWidth: 1, borderColor: '#CD0A0A' } : {} ]}
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={data => setPassword(data)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => loginHandler()}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>  

        <View style={styles.signUpContainer}>
          <Text style={styles.textSignUp}>
            ¿Todavia no tienes una cuenta?
          </Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textSignUpPress}>
              Registrate
            </Text>
          </TouchableWithoutFeedback>
        </View>            
      </View>
    </View>
  )
}
