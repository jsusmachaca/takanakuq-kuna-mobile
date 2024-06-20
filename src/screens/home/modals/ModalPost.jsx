import { useCallback, useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, TextInput, RefreshControl, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "../styles/ModalStyles";
import { CommentItem } from "../components/CommentItem";
import { ModalProfileHeader } from "../components/ModalProfileHeader";
import { apiClient } from "../../../utils/api/client";
import { useSQLiteContext } from "expo-sqlite";
import { Svg, Path } from "react-native-svg";

export const ModalPost = (props) => {
  const db = useSQLiteContext()

  const { onShowModal } = props
  const [disableButton, setDisableButton] = useState(true)
  const [comment, setComment] = useState('')
  const [ comments, setComments ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/comments/get-comments?post=${props.id}`)
      setComments(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }, [comments])

  const commentHandler = async () => {
    try {
      const [result] = await db.getAllAsync('SELECT * FROM user')

      await apiClient.post(`/api/comments/publish-comment?post=${props.id}`, {
        comment: comment
      }, {
        headers: {
          Authorization: `Bearer ${result.token}`
        }
      })
    } catch (err) {
      console.log(err.response.data)
    } finally {
      onRefresh()
    }
  }

  const onChangeText = (data) => {
    setDisableButton(false)
    setComment(data)
  }

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      fetchData().finally(() => {
        setComment('')
        setDisableButton(true)
        setRefreshing(false)
      })
    }, 2000)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View
      style={styles.modalBackground}
    >
      <View
        style={styles.modalPostBackground}
      >
        <ModalProfileHeader 
          profile_image={props.profile_image} 
          username={props.username} 
          date_publish={props.date_publish} 
          onShowModal={() => onShowModal(false)}
        />

        <ScrollView style={styles.scrollView} refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <View>
            <View style={styles.container} key={props.id}>
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
                {loading ? <ActivityIndicator size="large" color='#000' /> : (
                  comments.length > 0 ?
                      comments.map(comment => (
                        <CommentItem
                          key={comment.id}
                          id={comment.id}
                          profile_image={comment.profile_image} 
                          username={comment.username}
                          content={comment.comment}
                          date={comment.date}
                        />
                      ))
                    :
                      <View style={styles.textCommmentContainer}>
                        <Text style={styles.textComment}>
                          Aún no hay comentarios
                        </Text>
                      </View>
                )}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Escribe un comentario"
                    value={comment}
                    onChangeText={data => onChangeText(data)}
                    returnKeyType="done"
                    style={styles.commentInput}
                  />
                  <TouchableOpacity 
                    style={{ width: 50 }}
                    onPress={commentHandler}
                    disabled={disableButton}
                  >
                    <Svg 
                      viewBox="0 0 48 48" 
                      width="35"
                      height="35" 
                      fill="#000"
                      style={{
                        marginLeft: 13
                      }}
                    >
                      <Path
                        d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"
                        fill="#E94600"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}