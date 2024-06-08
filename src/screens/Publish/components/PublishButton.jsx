import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export const PublishButton = (props) => {
  return (
    <View>
    <TouchableOpacity 
      onPress={() => props.onPress()} 
      style={[styles.publishButton]}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Publicar</Text>
    </TouchableOpacity>
  </View>

  )
}

const styles = StyleSheet.create({
  publishButton : {
    marginRight: 16,
    backgroundColor: '#FF8F00',
    height: 35,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})