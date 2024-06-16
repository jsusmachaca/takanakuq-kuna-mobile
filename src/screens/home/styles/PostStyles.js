import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  postText: {
    fontSize: 20,
    margin: 10
  },
  postImage: {
    maxWidth: '100%',
    minHeight: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    objectFit: 'cover',
  },
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#D73400',
  },
  container: {
    marginBottom: 4,
    padding: 7,
    borderColor: '#000',
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
    position: 'relative'
  },
  username: {
    fontWeight: "bold",
    fontSize: 15
  },
  date: {
    fontSize: 15
  },
  showMore: {
    color: '#858585'
  },
  date_name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  comments: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'static',
    bottom: 5,
    backgroundColor: 'rgba(255, 143, 0, .8)',
    borderRadius: 20,
    padding: 8,
    marginTop: 18,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,
    elevation: 7,
  },
  commentsText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4
  }
})