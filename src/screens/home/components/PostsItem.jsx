import React, { useState, useEffect, memo } from "react"
import { View, Text, Image, TouchableNativeFeedback, Modal } from "react-native"
import { ModalPost } from '../modals/ModalPost.jsx';
import { styles } from "../styles/PostStyles.js";
import { apiClient } from "../../../utils/api/client.js";
import { Svg, Path } from "react-native-svg";

import defaultProfile from '../assets/avatars/default.png'
import avocado from '../assets/avatars/avocado.avatar.png'
import bear from '../assets/avatars/bear.avatar.png'
import koala from '../assets/avatars/koala.avatar.png'
import sheep from '../assets/avatars/sheep.avatar.png'
import spider from '../assets/avatars/spider.avatar.png'
import kactus from '../assets/avatars/kactus.avatar.png'


export const PostsItem = memo((props) => {
  const { data } = props

  const [ showModal, setVisible ] = useState(false)
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    apiClient.get(`/api/comments/get-comments?post=${data.id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const randomAvatars = () => {
    const avatars = [defaultProfile, avocado, bear, koala, sheep, spider, kactus]
    const random = Math.floor(Math.random()  * avatars.length)
    const image = avatars[random]
    return image
  }

  return (
    <>
    <TouchableNativeFeedback onPress={ () => setVisible(true) }>
      <View
        key={data.id}
        style={styles.container}
      >
        <View style={styles.date_name}>
          <View style={styles.date_name}>
            <Image style={styles.imageProfile}
              source={
                data.profile_image 
                ?
                  {
                    uri: data.profile_image
                  }
                :
                randomAvatars()
              }
            />
            <Text style={styles.username}>{data.username}</Text>
          </View>
          <Text style={styles.date}>{data.date_publish.slice(0, 10).replace(/-/g, '/')}</Text>
        </View>
        {data.post && data.post_image && (
          <View>
            <Text style={styles.postText}>
              {data.post.length <= 100
                ? data.post
                : `${data.post.slice(0, 115)}...`}
              {data.post.length > 120 && (
                  <Text style={styles.showMore}>Ver más</Text>
              )}
            </Text>
            <Image
              style={styles.postImage}
              source={{
                uri: data.post_image
              }}
            />
          </View>
        )}
        {data.post && !data.post_image && (
          <View>
            <Text style={styles.postText}>
              {data.post}
            </Text>
          </View>
        )}
        {!data.post && data.post_image && (
          <View>

            <Image
              style={styles.postImage}
              source={{
                uri: data.post_image
              }}
            />
          </View>
        )}

        <View style={styles.comments}>
          <Svg viewBox="0 0 512 512" width='20' height='20' fill='none'>
            <Path 
              d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
              stroke='#000'
              strokeWidth='50'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </Svg>
          <Text style={styles.commentsText}>
            {comments.length} comentarios
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
    <Modal visible={showModal} transparent={true} animationType="fade" >
      <ModalPost 
        id={data.id} 
        post={data.post} 
        post_image={data.post_image} 
        username={data.username} 
        profile_image={data.profile_image} 
        date_publish={data.date_publish}
        onShowModal={setVisible}
      />
    </Modal>
    </>
  )
})