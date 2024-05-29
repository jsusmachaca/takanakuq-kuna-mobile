import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from "react";
import { Posts } from './components/Posts';


export const Home = () => {
  return (
    <>
      <StatusBar />
      <View style={{backgroundColor: "#D6D6D6", height: '100%'}}>
        <Posts />
      </View>
    </>
  )
}