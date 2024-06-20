import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexDirection: 'row', 
    width: '100%', 
    paddingHorizontal: 10, 
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
  },
  logo: {
    width: 230, 
    height: 60,
    marginLeft: 1, 
    objectFit: 'cover',
  },
  picker: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  imageProfile: {
    width: 45,
    height: 45,
    borderRadius: 360,
  },
})