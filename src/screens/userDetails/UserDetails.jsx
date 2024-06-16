import { useEffect } from "react"
import { View } from "react-native"
import { apiClient } from "../../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"

export const UserDetails = () => {
  const db = useSQLiteContext()

  const fetchingUserInfo = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      console.log(result.username)
      const res = await apiClient.get(`/api/user/data?username=${result.username} `,{
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data)
    }


  }

  useEffect(() => {
    fetchingUserInfo()
  }, [])

  return (
    <View>

    </View>
  )
}