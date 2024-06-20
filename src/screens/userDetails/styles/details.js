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
    marginVertical: 16,
    overflow: 'hidden'
  }, 
  userImage: {
    width: 190,
    height: 190,
    objectFit: 'cover',
  },
  userNames: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'left' 
  },
})