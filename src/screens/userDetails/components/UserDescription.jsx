import { Text, View } from "react-native";


export const UserDescription = ({ description }) => {
  return (
    <View>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Acerca de mí</Text>
      <View style={{ 
        padding: 20,
        margin: 20,
        backgroundColor: '#EAEAEA',
        borderRadius: 20
      }}>
        <Text style={{
          fontSize: 17,
          textAlign: 'center',
          color: '#4C4C4C'
        }}>{ description }</Text>
      </View>
  </View>
  )
}