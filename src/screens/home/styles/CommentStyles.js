import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  commentCard: {
    margin: 10,
  },
  commentProfile: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  commentName: {
    fontSize: 17,
  },
  commentImageProfile: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D73400',
    marginRight: 9
  },
  comment: {
  },
  commentText: {
    marginTop: -10,
    fontSize: 18,
    fontWeight: '300',
    paddingHorizontal: 25,
    marginLeft: 16

  },
  scrollComment: {

  }
})