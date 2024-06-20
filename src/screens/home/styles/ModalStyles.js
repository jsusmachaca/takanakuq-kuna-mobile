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
    margin: 10,
    color: '#404040'
  },
  postImage: {
    maxWidth: '100%',
    height: 400,
    borderRadius: 20,
    objectFit: 'contain'
  },
  comments: {
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 65,
  },
  textCommmentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    padding: 0,
    margin: 0,
  },
  inputContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row',
    margin: 0,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  textComment: {
    paddingBottom: 10,
    fontSize: 15
  },
  commentInput: {
    backgroundColor: '#C8C8C8',
    borderRadius: 15,
    padding: 7,
    fontSize: 18,
    width: 280
  },
})
