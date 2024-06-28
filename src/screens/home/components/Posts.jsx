import { View, Text, FlatList, Image, RefreshControl } from "react-native"
import { apiClient } from "../../../utils/api/client"
import { useState, useEffect, useCallback } from "react"
import { PostsItem } from "./PostsItem"

export const Posts = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await apiClient.get(`/api/posts/all`)
      setData(res.data)
    } catch (err) {
      console.error('Error fetching data: ', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      fetchData()
      setRefreshing(false)
    }, 2000)
  }
  
  const keyExtractor = useCallback((item) => item.id.toString(), [])

  const renderItem = useCallback(({ item }) => (
    <PostsItem 
      data={item} 
      style={{
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 1,
        shadowRadius: 5.65,
        elevation: 6,
      }} 
    />
  ), [])

  return (
    <>
    <FlatList
      refreshControl={
        <RefreshControl 
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }
      onScroll={ ({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y <= -10) {
          onRefresh()
        } 
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
    </>
  )
}