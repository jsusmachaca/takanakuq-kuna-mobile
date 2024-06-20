import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  commentCard: {
    margin: 10,
    marginLeft: 13,
  },
  commentProfile: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  commentName: {
    fontSize: 18,
  },
  commentDate: {
    fontSize: 16,
    color: '#4D4D4D'
  },
  commentImageProfile: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D73400',
    marginRight: 9
  },
  commentText: {
    marginTop: -7,
    fontSize: 19,
    fontWeight: '300',
    paddingHorizontal: 25,
    marginLeft: 16

  },
  scrollComment: {

  }
})