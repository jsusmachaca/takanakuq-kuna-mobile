import { TextInput, View, TouchableOpacity, Text, TouchableWithoutFeedback, Modal, ActivityIndicator } from 'react-native' 
import { useState } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'

export const FormLogin = (props) => {
  const db = useSQLiteContext()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.post('/api/user/login', {
        username: username,
        password: password
      })
      if (response) {
        await db.runAsync(`INSERT INTO user (username, token) 
        VALUES (?, ?);`, 
        [username, response.data.access_token])
        console.log('Insertion successfully')
        setIsLoading(false)
        props.navigation.navigate('Home')
      }
    } catch (err) {
      setError(true)
      setIsLoading(false)
      console.error(`Error => ${err}`)
    }
  }

  return (
    <View style={styles.formContainer}>
      <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Modal>

      <View style={styles.formulario}>
        {
          error ?
            <Text style={{ marginBottom: 10, fontSize: 17, color: '#CD0A0A' }}>Credenciales incorrectas</Text>
          :
            <></>
        }
        <TextInput 
          placeholder='Ingrese su nombre usuario'
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

        <TouchableOpacity style={styles.loginButton}
          onPress={() => loginHandler()}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>    
        <View
          style={styles.signUpContainer}
        >
          <Text
            style={styles.textSignUp}
          >
            ¿Todavia no tienes una cuenta?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Register')}
          >
            <Text
              style={styles.textSignUpPress}
            >
              Registrate
            </Text>
          </TouchableWithoutFeedback>
          </View>            
      </View>
    </View>
  )
}
