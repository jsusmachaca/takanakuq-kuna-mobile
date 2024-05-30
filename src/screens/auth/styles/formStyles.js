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
  profileInput: {
    marginBottom: 28,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: 'white',
    fontSize: 19,
    width: 300,
    height: 300,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
    textAlign: 'left',
    textAlignVertical: 'center',
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
  },
  profileImageContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: 200,
    height: 200,
    position: 'relative',

  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
    overflow: 'hidden',
    position: 'relative'
  },
  textImage: {
    position: 'absolute',
    zIndex: 3,
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    width: 120,
    color: '#fff'
  },
  profileImage: {
    width: 195,
    height: 195,
  },
  coverBg: {
    width: 195,
    height: 195,
    position: 'absolute',
    backgroundColor: '#131313',
    opacity: .4
  },
  iconAdd: {
    width: 50,
    height: 50,
    backgroundColor: '#00D610',
    borderRadius: 360,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 6,
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchIcon: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconLinesH: {
    backgroundColor: 'white',
    width: 40,
    height: 6,
    borderRadius: 10,
    padding: 0,
    margin: 0,
    position: 'absolute',
  },
  iconLinesV: {
    backgroundColor: 'white',
    width: 6,
    height: 40,
    borderRadius: 10,
    padding: 0,
    margin: 0,
    position: 'absolute',
  }
})