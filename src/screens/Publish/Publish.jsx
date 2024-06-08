import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { Svg, Path } from "react-native-svg";
import { apiClient } from "../../utils/api/client";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowBack } from "./components/ArrowBack";
import { PublishButton } from "./components/PublishButton";

export const Publish = ({ navigation }) => {
  const db = useSQLiteContext()
  const [post, setPost] = useState('')
  const [placeholder, setPlaceholder] = useState('¿Comparte lo que sientes?')
  const [placeholderColor, setPlaceholderColor] = useState('#636363')
  
  useEffect (() => {
    setPost('')
    setPlaceholderColor('#636363')
    setPlaceholder('¿Comparte lo que sientes?')
  }, [])

  const onPressBack = () => {
    setPost('')
    setPlaceholderColor('#636363')
    setPlaceholder('¿Comparte lo que sientes?')
    navigation.navigate('Home')
  }

  const handlePost = async () => {
    if (post.length === 0) {
      setPlaceholder('Escribe algo para poder publicarlo')
      setPlaceholderColor('#CD0A0A')
      return
    }
    const [result] = await db.getAllAsync('SELECT * FROM user')

    apiClient.post('/api/posts/publish', {
      post: post
    },
    {
      headers: {
        Authorization: `Bearer ${result.token}`
      }
    })
      .then (res => {
        setPost('')
        setPlaceholderColor('#636363')
        setPlaceholder('¿Comparte lo que sientes?')
        navigation.navigate('Home')
      })
      .catch (err => {
        console.error(`Error to publish post error message: ${err.response}`)
      })
  }

  return (
    <View>
      <View style={{
        backgroundColor: 'white',
        height: 55,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOffset: {
          width: 6,
          height: 6
        },
        shadowOpacity: 0.5,
        elevation: 5,
      }}>
        <ArrowBack onPress={onPressBack} />
        <PublishButton onPress={handlePost} />
  
      </View>
      <View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={{
            backgroundColor: 'white',
            height: 100,
            marginTop: 10,
            fontSize: 19,
          }}
          value={post}
          onChangeText={setPost}
          
        />
      </View>
    </View>
  )
}

/*
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier"> 
    <path d="M22 11.9299H2" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
    <path d="M8.00009 19L2.84009 14C2.5677 13.7429 2.35071 13.433 2.20239 13.0891C2.05407 12.7452 1.97754 12.3745 1.97754 12C1.97754 11.6255 2.05407 11.2548 2.20239 10.9109C2.35071 10.567 2.5677 10.2571 2.84009 10L8.00009 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
  </g>
</svg>


<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#080341"></path>
</g>
</svg>
*/
