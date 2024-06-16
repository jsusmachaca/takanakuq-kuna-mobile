import { View, StatusBar, Platform } from 'react-native';
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
        console.log(result)
        navigation.navigate('Login')
      }
    }
    token()
    console.log(Platform.OS)
  }, [db, navigation])

  return (
    <>
      <StatusBar />
      <View style={{backgroundColor: "#f1e9de", height: '100%'}}>
        <Posts />
      </View>
    </>
  )
}