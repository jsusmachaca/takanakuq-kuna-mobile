import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";
import { apiClient } from "../../utils/api/client";
import { useSQLiteContext } from "expo-sqlite";

export const Publish = ({ navigation }) => {
  const db = useSQLiteContext()

  const [post, setPost] = useState('')
  
  const handlePost = async () => {
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
        navigation.navigate('Home')
        setPost('')
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
        <View
          style={{
            width: 50,
            margin: 0,
            padding: 0
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Svg
              viewBox="0 0 24 24"
              fill='none'
              style={{
                padding: 0,
                margin: 0,
              }}
              >
              <Path
                d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"
                stroke='#FF8F00'
                strokeWidth='1.5'
                fillRule="evenodd"
                clipRule="evenodd"
                />
            </Svg>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginRight: 10,
            backgroundColor: '#FF8F00',
            height: 30,
            width: 80,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => handlePost()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          placeholder="¿Comparte los que sientes?"
          style={{
            backgroundColor: 'white',
            height: 100,
            marginTop: 10,
            fontSize: 19
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