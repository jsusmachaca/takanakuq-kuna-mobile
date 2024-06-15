import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";

export const LoadingModal = ({ isLoading }) => {
  return (
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
  )
}
