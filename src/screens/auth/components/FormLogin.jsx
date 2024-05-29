import { TextInput, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native' 
import { useState } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import { db } from '../../../utils/db/sqlite'

export const FormLogin = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    apiClient.post('/api/user/login', {
      username: username,
      password: password
    })
      .then (res => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO user (username, token) VALUES (?, ?);',
            [username, res.data.access_token],
            () => { console.log('User inserted successfully') },
            (tx, error) => { console.log('Error inserting item: ', error) }
          )

          tx.executeSql(
            'SELECT * FROM user;',
            [],
            (tx, results) => {
              console.log('Query results:', results.rows)
            },
            (tx, error) => { console.log('Error fetching users:', error); }
          );
        })
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
          value={username}
          onChangeText={data => setUsername(data)}
        />
        <TextInput 
          placeholder='Ingrese su contraseña'
          style={styles.loginInput}
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
