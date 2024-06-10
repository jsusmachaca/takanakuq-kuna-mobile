import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  postText: {
    fontSize: 22,
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
    width: 43,
    height: 43,
    borderRadius: 50,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#D73400',
  },
  container: {
    margin: 4,
    padding: 8,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  username: {
    fontWeight: "bold",
    fontSize: 17
  },
  date: {
    fontSize: 17
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
  }
})