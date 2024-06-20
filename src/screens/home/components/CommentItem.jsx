import { View, Text, Image } from "react-native"
import { styles } from "../styles/CommentStyles"
import moment from "moment";
import 'moment-duration-format'

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
    <View style={styles.commentCard}>
      <View style={styles.commentProfile}>
        <Image style={styles.commentImageProfile}
          source={
            props.profile_image != null
              ?
              {
                uri: props.profile_image
              }
              :
            randomAvatars()
          }
        />
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', paddingRight: 50 }}>
          <Text style={styles.commentName}>{ props.username }</Text>
          <Text style={styles.commentDate}>{ getRelativeTime(props.date) }</Text>
        </View>
      </View>
      <Text style={styles.commentText}>
        {props.content}
      </Text>
    </View>
  )
}