import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({



  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D73400',
  },
  username: {
    fontWeight: "bold",
    fontSize: 19,
    marginLeft: 8
  },

  profile_header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 0,
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.5,
    elevation: 5
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  date: {
    fontSize: 18.5,
    marginRight: 10,
    color: '#969696'
  },
})