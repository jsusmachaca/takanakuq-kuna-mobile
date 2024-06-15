import { TextInput, View, TouchableOpacity, Text, Platform, Image, Alert } from 'react-native' 
import { useState, useCallback } from 'react'
import { styles } from '../styles/formStyles'
import { apiClient } from '../../../utils/api/client'
import defaultProfile from '../assets/avatars/default.png'
import * as ImagePicker from 'expo-image-picker'
import { useSQLiteContext } from 'expo-sqlite'

export const FormProfile = ({ navigation }) => {
  const db = useSQLiteContext()

  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Lo siento, necesitamos permisos para acceder a la cámara.')
        return
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  
  const profileHandler = useCallback(async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')

      let formData = new FormData();

      if (image) {
        let filename = image.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        formData.append('profile_image', { uri: image, name: filename, type })
      }

      formData.append('description', description);

      const response = await apiClient.post('/api/user/add-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${result.token}`,
        },
      })
      navigation.navigate('Home')
      console.log(response.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
      Alert.alert('Error', err.response.data.error)
    }
  }, [image, description, db, navigation])

  return (
    <View style={styles.formContainer}>
      <View style={styles.formulario}>
        <View style={styles.profileImageContainer}>
          <View style={styles.iconAdd}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.touchIcon}>
              <View style={styles.iconLinesH}></View>
              <View style={styles.iconLinesV}></View>
            </View>
          </TouchableOpacity>
          </View>
            <View style={styles.imageContainer}>
              {
                image ?
                  <></>
                :
                <Text style={styles.textImage}>Elegir una foto de perfil</Text>
              }        
              <Image 
                source={
                  image 
                  ?
                  { 
                    uri: image
                  }
                  : 
                  defaultProfile
                } 
                style={styles.profileImage} 
              />
                {
                  image ?
                    <></>
                  :
                    <View style={styles.coverBg}></View>
                }
            </View>
        </View>
        <TextInput 
          placeholder='Ingrese una breve descripción acerca de usted.'
          style={styles.profileInput}
          value={description}
          multiline={true}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.loginButton}
          onPress={() => profileHandler()}
        >
          <Text style={styles.buttonText}>Listo</Text>
        </TouchableOpacity>             
      </View>
    </View>
  )
}
