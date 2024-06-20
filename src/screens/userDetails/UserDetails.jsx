import { useCallback, useEffect, useState } from "react"
import { View, Image, Text, FlatList, Dimensions, ActivityIndicator, RefreshControl, Alert } from "react-native"
import { apiClient } from "../../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"
import { PostsItem } from "../home/components/PostsItem"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { bg } from './assets/bg.png'
import RNPickerSelect from "react-native-picker-select"
import { Path, Svg } from "react-native-svg"
import { styles } from "./styles/details"
import { UserDescription } from "./components/UserDescription"

export const UserDetails = () => {
  const db = useSQLiteContext()
  const [userDetails, setUserDetails] = useState({})
  const [postData, setPostData] = useState({})
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [routes] = useState([
    { key: 'first', title: 'Información' },
    { key: 'second', title: 'Tus Posts' },
  ])

  const fetchPostData = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      const res = await apiClient.get(`/api/posts/user?id=${result.id}`, {
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
      setPostData(res.data)
    } catch (err) {
      console.error(err.response)
    }
  }
  
  
  const fetchingUserInfo = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')
      const res = await apiClient.get('/api/user/data', {
        headers: {
          Authorization: `Bearer ${result.token}`
        } 
      })
      setUserDetails(res.data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id) => {
    Alert.alert('Confirmación', '¿Estás seguro que deseas eliminar la publicación?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Canceled'),
        style: 'cancel'
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const [result] = await db.getAllAsync('SELECT * FROM user')
            const res = await apiClient.delete(`/api/posts/delete?id=${id}`, {
              headers: {
                Authorization: `Bearer ${result.token}`
              }
            })
            if (res) {
              console.log(res.data)
            }
          } catch (err) {
            console.log('bro ' + err.response.data)
          } finally {
            onRefresh()
          }
        }
      }
    ], { cancelable: false })
  }

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      fetchPostData()
      setRefreshing(false)
    }, 2000)
  }

  const initialLayout = { width: Dimensions.get('window').width };

  const keyExtractor = useCallback((item) => item.id, [])

  const renderItem = useCallback(({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <RNPickerSelect
          onValueChange={() => deletePost(item.id)}
          items={[
            { label: 'Eliminar publicación', value: 'signOut' }
          ]}
          placeholder={{}}
        >
          <View style={styles.moreIconContainer}>
            <Svg viewBox="0 0 20 20" fill="none" width="22" height="22">
              <Path 
                d="M12 3a2 2 0 10-4 0 2 2 0 004 0zm-2 5a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z"
                fill="#000"
              />
            </Svg>
          </View>
        </RNPickerSelect>
      </View>
      <PostsItem data={item} />
    </View>
  ), [])

  const renderScene = SceneMap({
    first: () => (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        {loading ? <ActivityIndicator size="large" color='#000' /> : (
          <UserDescription description={userDetails.description} />
        )}
      </View>
    ),
    second: () => (
      <View>
        {loading ? <ActivityIndicator size="large" color='#000' /> : (
          <FlatList
          refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
          }
          data={postData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          />
        )}
      </View>
    ),
  })
    
  useEffect(() => {
    fetchingUserInfo()
    fetchPostData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.userProfileContainer}>
        <Image source={require('./assets/bg.png')} style={styles.imageBackground} />
        {loading ? <ActivityIndicator size="large" color='#000' /> : (
          <>
          <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={{uri: userDetails.profile_image}} 
            />
          </View>
          <View >
            <Text style={styles.userNames}>
              { userDetails.first_name.toUpperCase() } { userDetails.last_name.toUpperCase() }
            </Text>
          </View>
        </>
        )}
      </View>
      <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'orange' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', height: 20 }}
          />
        )}
      />
    </View>
  )
}