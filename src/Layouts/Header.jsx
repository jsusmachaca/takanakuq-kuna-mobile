import { View, Image } from 'react-native';
import { useEffect, useState, useCallback } from "react"
import { apiClient } from "../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"
import RNPickerSelect from "react-native-picker-select"
import logo from '../../assets/logoNombreHorizontal3.png'
import { styles } from './styles/header'

export const Header = ({ navigation }) => {
  const db = useSQLiteContext()
  const [userInfo, setUserInfo] = useState({})

  const fetchingUserInfo = useCallback(async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      const res = await apiClient.get('/api/user/data', {
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
      setUserInfo(res.data)
      await db.runAsync('UPDATE user SET id=?;', [res.data.id])
    } catch (err) {
      console.error(err.message)
    }
  }, [userInfo, db])

  const handlerSelect = async () => {
    try {
      const [result] = await db.getAllAsync('DELETE FROM user')
      console.log('User Deleted' + result)
      navigation.navigate('Login')
    } catch (err) {
      console.err(err.message)
    }
  }

  useEffect(() => {
    fetchingUserInfo()
  }, [])
  return (
    <View style={styles.headerContainer}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <RNPickerSelect
        onValueChange={() => handlerSelect()}
        items={[
          { label: 'Cerrar sesión', value: 'signOut' }
        ]}
        placeholder={{}}
        style={styles.picker}>
        <Image 
          style={styles.imageProfile} 
          source={{ uri: userInfo.profile_image }}
        />
      </RNPickerSelect>
    </View>
  )
}