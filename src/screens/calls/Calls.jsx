import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useSQLiteContext } from 'expo-sqlite'

const appId = '3842627e445d421b8908bea863efa541'
const channelName = 'testChannel'

export const Calls = () => {
  const db = useSQLiteContext()

  const [isAdmin, setIsAdmin] = useState(false)
  const [engine, setEngine] = useState(null);
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState([]);


  useEffect(() => {
    const token = async () => {
      try {
        const [result] = await db.getAllAsync('SELECT * FROM user')
        setIsAdmin(!!result.is_admin)
      } catch (err) {
        console.error(err.message)
      }
    }
    token()
  }, [db])

  return (
    <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Aún no disponible</Text>
    </View>
  )
}