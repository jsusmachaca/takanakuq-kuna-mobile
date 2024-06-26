import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    margin: 0, 
    padding: 0, 
    width: '100%', 
    height: '100%' 
  },
  userProfileContainer: {
    width: '100%',
    height: 270,
    alignItems: 'center',
    backgroundColor: '#fff',
    
  },
  postContainer: { 
    backgroundColor: '#fff',     
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7, 
    marginBottom: 5,
  },
  postHeader: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    width: '100%' 
  },
  moreIconContainer: {
    marginVertical: 10,
    marginRight: 15,
    marginTop: 12 
  },
  imageBackground : { 
    zIndex: -2, 
    width: '100%', 
    height: '100%', 
    opacity: .3, 
    objectFit: 'cover', 
    position: 'absolute',
  },
  userImageContainer: {
    width: 190,
    height: 190,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
    borderRadius: 360,
    marginTop: 11,
    marginBottom: 5,
    overflow: 'hidden',
  }, 
  userImage: {
    width: 190,
    height: 190,
    objectFit: 'cover',
  },
  userNames: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center' 
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
    height: 200,
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
  profileImageContainer: {
    marginTop: 10,
    marginBottom: 40,
    width: 200,
    height: 200,
    position: 'relative',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E94600',
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
    width: 250,
    height: 250,
  },
  coverBg: {
    width: 250,
    height: 250,
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