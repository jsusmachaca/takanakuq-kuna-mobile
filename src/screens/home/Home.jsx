import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useEffect } from "react";
import { Posts } from './components/Posts';
import { useSQLiteContext } from 'expo-sqlite'

export const Home = ({ navigation }) => {
  const db = useSQLiteContext()

  useEffect(() => {
    const token = async () => {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      if (result && result.username && result.token) {
        console.log(result)
      } else {
        console.log(result)
        navigation.navigate('Login')
      }
    }
    token()
  }, [db, navigation])

  return (
    <>
      <StatusBar />
      <View style={{backgroundColor: "#D6D6D6", height: '100%'}}>
        <Posts />
      </View>
    </>
  )
}