import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20
  },
  formContainerRegister: {
    marginTop: 8,
    marginBottom: 0,
    padding: 0
  },
  loginInput:{
    marginBottom: 28,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: 'white',
    fontSize: 19,
    width: 300,
    height: 55,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7
  },
  formulario:{
      alignItems: 'center'
  },
  loginButton: {
    width: 300,
    height: 50,
    backgroundColor: '#E94600',
    padding:10,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18.5,
    color: 'white',
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  textSignUp: {
    fontSize: 17,
  },
  textSignUpPress: {
    color: '#FF4D00',
    textDecorationLine: 'underline',
    marginLeft: 5,
    fontSize: 17.5
  }
})