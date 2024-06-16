import { useEffect, useState } from "react"
import { View, Image, Text } from "react-native"
import { apiClient } from "../../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"

export const UserDetails = () => {
  const db = useSQLiteContext()
  const [userDetails, setUserDetails] = useState({})

  const fetchingUserInfo = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      const res = await apiClient.get(`/api/user/data?username=${result.username}`, {
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
      setUserDetails(res.data)
    } catch (err) {
      console.log(err.response.data)
    }


  }

  useEffect(() => {
    fetchingUserInfo()
  }, [])

  return (
    <View>
      <Image
        style={{
          width: 300,
          height: 300
        }}
       source={{uri: userDetails.profile_image}} 
      />
      <Text>{ userDetails.description }</Text>
    </View>
  )
}