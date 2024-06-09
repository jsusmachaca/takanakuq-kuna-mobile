import { useCallback } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native"
import { apiClient } from "../../../utils/api/client"
import { useState, useEffect } from "react"
import { PostsItem } from "./PostsItem"


export const Posts = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [mostData, setData] = useState({})

  const fetchData = async () => {
    try {
      const res = await apiClient.get(`/api/posts/all`)
      setData(res.data)
    } catch (err) {
      console.error(err.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      apiClient.get(`/api/posts/all`)
        .then(res => {
          setData(res.data)
        })
        .catch(err => console.error(err))
      setRefreshing(false);
    }, 2000);
  };

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
      data={mostData}
      renderItem={({ item: data }) => (
        <PostsItem data={data} />
      )}
    />
    </>
  )
}