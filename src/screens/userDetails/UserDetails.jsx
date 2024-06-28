import { useCallback, useEffect, useState } from "react"
import { View, Image, Text, FlatList, Dimensions, ActivityIndicator, RefreshControl, Alert, TouchableOpacity, Modal, TextInput, Platform } from "react-native"
import { apiClient } from "../../utils/api/client"
import { useSQLiteContext } from "expo-sqlite"
import { PostsItem } from "../home/components/PostsItem"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { bg } from './assets/bg.png'
import RNPickerSelect from "react-native-picker-select"
import { Path, Svg } from "react-native-svg"
import { styles } from "./styles/details"
import defaultProfile from './assets/default.png'
import { UserDescription } from "./components/UserDescription"
import * as ImagePicker from 'expo-image-picker'
import { LoadingModal } from "../auth/components/LoadingModal"
import { EditUserDetails } from "./components/EditUserDetails"


export const UserDetails = () => {
  const db = useSQLiteContext()
  const [userDetails, setUserDetails] = useState({})
  const [postData, setPostData] = useState({})
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const [routes] = useState([
    { key: 'first', title: 'Información' },
    { key: 'second', title: 'Tus Posts' },
  ])

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Lo siento, necesitamos permisos para acceder a la cámara.')
        return
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

    
  const profileHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      
      const [result] = await db.getAllAsync('SELECT * FROM user')

      let formData = new FormData();

      if (image) {
        let filename = image.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        formData.append('profile_image', { uri: image, name: filename, type })
      }
      if (description.length === 0){
        setDescription(userDetails.description)
      }
      formData.append('description', description);

      const response = await apiClient.put('/api/user/edit-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${result.token}`,
        },
      })
      setDescription(response.data.description)
    } catch (err) {
      console.log(err.response?.data || err.message)
      Alert.alert('Error', err.response.data.error)
    } finally {
      setIsLoading(false)
      setModalVisible(false)
      setLoading(false)
      fetchingUserInfo()
    }
  }, [image, description, db])


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
      console.error(err.message)
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
      setDescription(res.data.description)
    } catch (err) {
      console.error(err.message)
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
            console.error(err.response.data)
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

  const keyExtractor = useCallback((item) => item.id.toString(), [])

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
            source={
              userDetails.profile_image ?
              { 
                uri: userDetails.profile_image
              }
              :
              defaultProfile
            }
            />
          </View>
          <View>
            <Text style={styles.userNames}>
              { userDetails.first_name.toUpperCase() } 
            </Text>
            <Text style={styles.userNames}>
              { userDetails.last_name.toUpperCase() }
            </Text>
          </View>
        </>
        )}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ 
            position: 'absolute', 
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 5, 
            right: 5,
            width: 45,
            height: 45,
            borderRadius: 360,
            backgroundColor: '#F44E19',    
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 5
            },
            shadowOpacity: 1,
            shadowRadius: 5.65,
            elevation: 7, 
          }}>
          <Svg viewBox="0 0 18 18" width='27' height='27'>
            <Path 
              d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z"
              fill='#fff'
              />
          </Svg>
        </TouchableOpacity>
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

      <Modal visible={modalVisible} transparent={true} animationType="fade" >
        <LoadingModal isLoading={isLoading} />
          <EditUserDetails 
            userDetails={userDetails}
            image={image}
            description={description}
            defaultProfile={defaultProfile}
            setDescription={setDescription}
            profileHandler={profileHandler}
            setModalVisible={() => setModalVisible(false)}
            pickImage={pickImage}
          />
      </Modal>
    </View>
  )
}