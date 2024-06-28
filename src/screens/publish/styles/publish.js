import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'white',
    height: 55,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  inputContainer: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  input: {
    backgroundColor: 'white',
    width: 380,
    height: 'auto',
    marginTop: 30,
    borderRadius: 10,
    fontSize: 19,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7, 
  }, 
  uploadImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImageBox: {
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: 'rgba(228, 228, 228, .95)',
    overflow: 'hidden',
    width: 370,
    height: 330,
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7, 
  },
  touchable: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})