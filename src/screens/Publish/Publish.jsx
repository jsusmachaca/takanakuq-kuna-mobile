import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, Image, Alert, ActivityIndicator, Modal, ImageBackground } from "react-native";
import { apiClient } from "../../utils/api/client";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowBack } from "./components/ArrowBack";
import * as ImagePicker from 'expo-image-picker'
import { PublishButton } from "./components/PublishButton";
import { Svg, Path } from "react-native-svg";
import { styles } from "./styles/publish";

export const Publish = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const db = useSQLiteContext()
  const [post, setPost] = useState('')
  const [placeholder, setPlaceholder] = useState('¿Comparte lo que sientes?')
  const [placeholderColor, setPlaceholderColor] = useState('#636363')
  const [image, setImage] = useState(null)
  
  useEffect (() => {
    setPost('')
    setImage(null)
    setPlaceholderColor('#636363')
    setPlaceholder('¿Comparte lo que sientes?')

    if (Platform.OS === 'android') {
      const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Lo siento, necesitamos permisos para acceder a la cámara.')
        }
      }
      requestPermission()
    }

  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const onPressBack = () => {
    setPost('')
    setImage(null)
    setPlaceholderColor('#636363')
    setPlaceholder('¿Comparte lo que sientes?')
    navigation.navigate('Home')
  }

  const handlePost = useCallback(async () => {
    try {
      setIsLoading(true)
      let formData = new FormData()
      
      if (post.length === 0) {
        setPlaceholder('Escribe algo para poder publicarlo')
        setPlaceholderColor('#CD0A0A')
        setIsLoading(false)
        return
      }
      const [result] = await db.getAllAsync('SELECT * FROM user')
      
      if (image) {
        let filename = image.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`
        
        formData.append('post_image', { uri: image, name: filename, type })
      }
      formData.append('post', post);
      
      const res = await apiClient.post('/api/posts/publish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${result.token}`
        },
      })
      if (res) {
        setPost('')
        setImage(null)
        setPlaceholderColor('#636363')
        setPlaceholder('¿Comparte lo que sientes?')
        navigation.navigate('Home')
      }
    } catch (err) {
      console.error(err.response)
      Alert.alert('Lo siento, hemos tenido inconvenientes con nuestros servidores.')
    } finally {
      setIsLoading(false)
    }
  }, [post, image, db, navigation])
  
  return (
    <ImageBackground source={require('./assets/bg.png')} style={{ width: '100%', height: '100%' }}>
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

      <View style={styles.arrow}>
        <ArrowBack onPress={onPressBack} />
        <PublishButton onPress={handlePost} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          multiline={true}
          style={[styles.input, { borderColor: placeholderColor }]}
          value={post}
          onChangeText={setPost}
        />
      </View>

      <View style={styles.uploadImageContainer}>
        <View style={styles.uploadImageBox}>
          {
            image ?
            <TouchableOpacity onPress={pickImage} style={styles.touchable}>
              <Image style={{width: 370, height: 330}} source={{ uri: image }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={pickImage} style={styles.touchable}>
              <Svg viewBox="0 0 512 512" width='50' height='50'>
                <Path 
                  d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                />
              </Svg>
              <Text style={{ fontSize: 19 }}>Subir una imagen</Text>
            </TouchableOpacity>
          }        
        </View>
      </View>
    </ImageBackground>
  )
}