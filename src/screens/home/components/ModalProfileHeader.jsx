import { View, Text, Image } from "react-native"
import { styles } from "../styles/ProfileHeaderStyles"

import defaultProfile from '../assets/avatars/default.png'
import avocado from '../assets/avatars/avocado.avatar.png'
import bear from '../assets/avatars/bear.avatar.png'
import koala from '../assets/avatars/koala.avatar.png'
import sheep from '../assets/avatars/sheep.avatar.png'
import spider from '../assets/avatars/spider.avatar.png'
import kactus from '../assets/avatars/kactus.avatar.png'

export const ModalProfileHeader = (props) => {
  const randomAvatars = () => {
    const avatars = [defaultProfile, avocado, bear, koala, sheep, spider, kactus]
    const random = Math.floor(Math.random()  * avatars.length)
    const image = avatars[random]
    return image
  }
  return (
    <View style={styles.profile_header}>
    <View style={styles.profile}>
      <Image style={styles.imageProfile}
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
      <Text style={styles.username}>{props.username}</Text>
    </View>
    <Text style={styles.date}>{props.date_publish.slice(0, 10).replace(/-/g, '/')}</Text>
  </View>
  )
}