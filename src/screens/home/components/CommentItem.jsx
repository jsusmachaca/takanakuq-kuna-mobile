import { View, Text, Image } from "react-native"
import { styles } from "../styles/CommentStyles"

import defaultProfile from '../assets/avatars/default.png'
import avocado from '../assets/avatars/avocado.avatar.png'
import bear from '../assets/avatars/bear.avatar.png'
import koala from '../assets/avatars/koala.avatar.png'
import sheep from '../assets/avatars/sheep.avatar.png'
import spider from '../assets/avatars/spider.avatar.png'
import kactus from '../assets/avatars/kactus.avatar.png'


export const CommentItem = (props) => {
  const randomAvatars = () => {
    const avatars = [defaultProfile, avocado, bear, koala, sheep, spider, kactus]
    const random = Math.floor(Math.random()  * avatars.length)
    const image = avatars[random]
    return image
  }

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentProfile}>
        <Image style={styles.commentImageProfile}
          source={
            props.profile_image
              ?
              {
                uri: props.profile_image
              }
              :
              randomAvatars()

          }
        />
        <Text style={styles.commentName}>{props.username}</Text>
      </View>
      <Text style={styles.commentText}>
        {props.content}
      </Text>
    </View>
  )
}