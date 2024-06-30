import { Text } from 'react-native' 

export const renderError = (error) => {
  if (error) {
    return (
      <Text style={{ marginHorizontal: 10, marginBottom: 10, fontSize: 17, color: '#CD0A0A' }}>
        {error}
      </Text>
    );
  }
  return null;
}