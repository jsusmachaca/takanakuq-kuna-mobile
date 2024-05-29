import { TextInput, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native' 
import { useState } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { useSQLiteContext } from 'expo-sqlite'

export const FormLogin = (props) => {
  const db = useSQLiteContext()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    apiClient.post('/api/user/login', {
      username: username,
      password: password
    })
      .then (async res => {
        await db.runAsync(`INSERT INTO user (username, token) 
        VALUES (?, ?);`, 
        [username, res.data.access_token])
        console.log('Insertion successfully')

        props.navigation.navigate('Home')
      })
      .catch (err => {
        console.log(err)
      })
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.formulario}>
        <TextInput 
          placeholder='Ingrese su nombre usuario'
          style={styles.loginInput}
          returnKeyType='next'
          autoCapitalize='none'
          value={username}
          onChangeText={data => setUsername(data)}
        />
        <TextInput 
          placeholder='Ingrese su contraseña'
          style={styles.loginInput}
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
