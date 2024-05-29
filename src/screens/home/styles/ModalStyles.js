import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  scrollView: {
    margin: 6
  },
  container: {
    paddingBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(70,70,70,0.9)"
  },
  closeModal: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalPostBackground: {
    backgroundColor: "white",
    width: "95%",
    height: "90%",
    borderRadius: 20
  },
  posts: {
    fontSize: 22.6,
    margin: 10
  },
  postImage: {
    maxWidth: '100%',
    height: 280,
    borderRadius: 20
  },

  comments: {
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    marginTop: 10
  },
  textCommmentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    padding: 0,
    margin: 0,
  },
  textComment: {
    paddingBottom: 10,
    fontSize: 15
  }
})
