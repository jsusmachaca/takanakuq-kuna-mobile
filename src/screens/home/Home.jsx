import { View, StatusBar, Platform, ImageBackground } from 'react-native';
import React, { useEffect } from "react";
import { Posts } from './components/Posts';
import { useSQLiteContext } from 'expo-sqlite'

export const Home = ({ navigation }) => {
  const db = useSQLiteContext()

  useEffect(() => {
    const token = async () => {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      if (result && result.username && result.token) {
      } else {
        navigation.navigate('Login')
      }
    }
    token()
  }, [db, navigation])

  return (
    <>
      <StatusBar />
      <ImageBackground source={require('./assets/bg.png')} style={{ height: '100%' }}>
        <Posts />
      </ImageBackground>
    </>
  )
}