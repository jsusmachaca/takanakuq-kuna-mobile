import { useCallback, useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, TextInput, RefreshControl, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "../styles/ModalStyles";
import { CommentItem } from "../components/CommentItem";
import { ModalProfileHeader } from "../components/ModalProfileHeader";
import { apiClient } from "../../../utils/api/client";
import { useSQLiteContext } from "expo-sqlite";


export const ModalPost = (props) => {
  const db = useSQLiteContext()

  const { onShowModal, post_id } = props
  const [comment, setComment] = useState('')
  const [ comments, setComments ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/api/comments/get-comments?post=${props.id}`)
      if (response) {
        setComments(response.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      fetchData().finally(() => {
        setComment('')
        setRefreshing(false)
      })
    }, 2000)
  }

  const renderItem = useCallback(({ item }) => (
    <CommentItem 
      key={item.id}
      id={item.id}
      profile_image={item.profile_image}
      username={item.username}
      comment={item.comment}
    />
  ), [])

  const keyExtractor = useCallback((item) => item.id.toString(), [])

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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

        <FlatList 
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.scrollView} 
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={() => (
            <View key={props.id} style={styles.container}>
              <Text style={styles.posts}>{props.post}</Text>
              {
                props.post_image ? (
                  <Image
                    style={styles.postImage}
                    source={{
                      uri: props.post_image
                    }}
                  />
                ) : <></>
              }
            </View>
            
          )}
          ListFooterComponent={() => (
            <View style={styles.comments}>
              {comments.length === 0 && (
                <View style={styles.textCommmentContainer}>
                  <Text style={styles.textComment}>Aún no hay comentarios</Text>
                </View>
              )}
              <TextInput
                placeholder="Escribe un comentario"
                value={comment}
                onChangeText={setComment}
                style={styles.commentInput}
              />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

/*
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
                <TextInput
                  placeholder="Escribe un comentario"
                  onChangeText={setComment}
                  returnKeyType="done"
                  style={styles.commentInput}
                />
              </View>
          </View>
          */