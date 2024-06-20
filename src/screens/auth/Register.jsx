import { View, Keyboard, Image, ScrollView, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import { FormRegister } from './components/FormRegister'
import { styles } from './styles/styles'
import { useSQLiteContext } from 'expo-sqlite'

import logo_1 from './assets/avatars/logo.1.jpg'
import logo_2 from './assets/avatars/logo.2.jpg'

const logos = [logo_1, logo_2]

export const Register = ({ navigation }) => {
  const db = useSQLiteContext()

  const [image, setImage] = useState(logos[0])
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const token = async () => {
      try {
        const [result] = await db.getAllAsync('SELECT * FROM user')
        if (result && result.username && result.token) {
          navigation.navigate('Home')
        } else {
          console.log(result)
        }
      } catch (err) {
        console.error(err)
      }
    }
    token()
  }, [db, navigation])

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      if (!isKeyboardVisible) {
        index = (index + 1) % logos.length
        setImage(logos[index])
      }
    }, 10000)

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
      setImage(logos[index])
    })

    return () => {
      clearInterval(intervalId)
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [isKeyboardVisible])

  return( 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar />
        <View style={[styles.logoContainerRegister, { marginBottom: isKeyboardVisible ? 55 : 0 }]}>
          {!isKeyboardVisible && (
            <Image source={image} style={styles.logoRegister} />
          )}
        </View>
        <FormRegister navigation={navigation} />
      </ScrollView>
  )
}

