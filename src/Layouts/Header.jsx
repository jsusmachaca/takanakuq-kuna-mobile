import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useEffect, useState, useCallback } from "react"
import { apiClient } from "../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"
import RNPickerSelect from "react-native-picker-select"
import logo from '../../assets/logo.5.png'


export const Header = ({ navigation }) => {
  const db = useSQLiteContext()
  const [userInfo, setUserInfo] = useState({})

  const fetchingUserInfo = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      const res = await apiClient.get(`/api/user/data?username=${result.username}`, {
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
      setUserInfo(res.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    fetchingUserInfo()
  }, [])

  const handlerSelect = async () => {
    try {
      const [result] = await db.getAllAsync('DELETE FROM user')
      console.log('lograo' + result)
      navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', paddingHorizontal: 10, backgroundColor: '#fff'}}>
      <Image
        source={logo}
        width={10}
        height={10}
        style={{ width: 70, height: 60, marginLeft: 1 }}
      />
      <RNPickerSelect
        onValueChange={() => handlerSelect()}
        items={[
          { label: 'Cerrar sesión', value: 'signOut' }
        ]}
        placeholder={{}}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          style={{
            width: 45,
            height: 45,
            borderRadius: 360
          }} 
          source={{ uri: userInfo.profile_image }}
        />
      </RNPickerSelect>
    </View>
  )
}