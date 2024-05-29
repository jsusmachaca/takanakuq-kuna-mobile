import React, { useState } from "react"
import { View, Text, Image, TouchableNativeFeedback, Modal } from "react-native"
import { ModalPost } from '../modals/ModalPost.jsx';
import { styles } from "../styles/PostStyles.js";

import defaultProfile from '../assets/avatars/default.png'
import avocado from '../assets/avatars/avocado.avatar.png'
import bear from '../assets/avatars/bear.avatar.png'
import koala from '../assets/avatars/koala.avatar.png'
import sheep from '../assets/avatars/sheep.avatar.png'
import spider from '../assets/avatars/spider.avatar.png'
import kactus from '../assets/avatars/kactus.avatar.png'


export const PostsItem = (props) => {
  const { data } = props

  const [ showModal, setVisible ] = useState(false)

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
      </View>
    </TouchableNativeFeedback>
    <Modal visible={showModal} transparent={true} animationType="slide" >
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
}