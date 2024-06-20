import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "../styles/ProfileHeaderStyles"
import moment from "moment";
import 'moment-duration-format'
import { Svg, Path } from "react-native-svg";

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
  
  const getRelativeTime = (date) => {
    const now = moment();
    const postDate = moment.utc(date);
    const duration = moment.duration(now.diff(postDate));
  
    if (duration.asMinutes() < 60) {
      return `Hace ${Math.floor(duration.asMinutes())}m`
    } else if (duration.asHours() < 24) {
      return `Hace ${Math.floor(duration.asHours())}h`
    } else if (duration.asDays() < 30) {
      return `Hace ${Math.floor(duration.asDays())}d`
    } else if (duration.asMonths() < 12) {
      return `Hace ${Math.floor(duration.asMonths())}mo`
    } else {
      return postDate.format('DD MMM YYYY')
    }
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
        <View style={{ display: 'flex' }}>
          <Text style={[styles.username, { textAlign: 'left' }]}>{props.username}</Text>
          <Text style={[styles.date, { textAlign: 'left' }]}>{ getRelativeTime(props.date_publish) }</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onShowModal} style={[styles.closeModal]}>
        <View>
          <Svg viewBox='0 0 512 512' width='40' height='40'>
            <Path 
              d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'
              fill='#F44E19'
            />
          </Svg>
        </View>
      </TouchableOpacity>
  </View>
  )
}

/*
<svg viewBox="0 0 512 512">
  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
</svg>
*/