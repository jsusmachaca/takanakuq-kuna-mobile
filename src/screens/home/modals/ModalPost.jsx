import { useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { styles } from "../styles/ModalStyles";
import { CommentItem } from "../components/CommentItem";
import { ModalProfileHeader } from "../components/ModalProfileHeader";
import { apiClient } from "../../../utils/api/client";


export const ModalPost = (props) => {
  const { onShowModal, post_id } = props
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    apiClient.get(`/api/comments/get-comments?post=${props.id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <View
      style={styles.modalBackground}
    >
      <TouchableOpacity onPress={() => onShowModal(false)} style={{ marginBottom: 10 }}>
        <View style={styles.closeModal}>
          <Text>❌</Text>
        </View>
      </TouchableOpacity>

      <View
        style={styles.modalPostBackground}
      >

        <ModalProfileHeader 
          profile_image={props.profile_image} 
          username={props.username} 
          date_publish={props.date_publish} 
        />

        <ScrollView style={styles.scrollView}>
          <View>
            <View
              style={styles.container}
              key={props.id}
            >

              <Text style={styles.posts}>{props.post}</Text>
              {
                props.post_image ?
                  <Image
                    style={styles.postImage}
                    source={{
                      uri: props.post_image
                    }}
                  />
                  : 
                  <></>
              }
            </View>

              <View style={styles.comments}>
                { comments.length > 0 ?
                    comments.map(comment => (
                      <CommentItem
                        key={comment.id}
                        id={comment.id}
                        profile_image={comment.profile_image} 
                        username={comment.username}
                        content={comment.comment}
                      />
                    ))
                  :
                    <View style={styles.textCommmentContainer}>
                      <Text style={styles.textComment}>
                        Aún no hay comentarios
                      </Text>
                    </View>
                }
              </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}