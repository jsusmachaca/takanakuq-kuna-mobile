import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { apiClient } from "../../../utils/api/client";
import { useState, useEffect } from "react";
import { PostsItem } from "./PostsItem";


export const Posts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [ mostData, setData] = useState({})

  useEffect(() => {
    apiClient.get(`/api/posts/all`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
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