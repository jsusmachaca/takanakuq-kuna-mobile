import { useState, useEffect, useCallback } from "react"
import { ImageBackground } from "react-native"
import { useSQLiteContext } from 'expo-sqlite'
import { GiftedChat } from "react-native-gifted-chat"
import { apiClient } from "../../utils/api/client"
import io from 'socket.io-client'

const socket = io('http://192.168.156.174:3000')

export const Chat = () => {
  const db = useSQLiteContext()

  const [messages, setMessages] = useState([])
  const [userInfo, setUserInfo] = useState({})

  const fetchingUserInfo = useCallback(async () => {
    try {
      try {
        const [result] = await db.getAllAsync('SELECT * FROM user')
        const res = await apiClient.get('/api/user/data', {
          headers: {
            Authorization: `Bearer ${result.token}`
          }
        })
        setUserInfo(res.data)
      } catch (err) {
        console.error(err.message)
      }
    } catch (err) {
      console.error(err.message)
    }
  }, [userInfo, db])

  useEffect(() => {
    fetchingUserInfo()
    
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('bot response', (message) => {
      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        }
      }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage))
    })
    
    return () => {
      socket.off('bot response')
      socket.disconnect()
    }
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    socket.emit('chat message', messages[0].text)
  }, [])

  return (
    <ImageBackground source={require('./assets/bg.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: userInfo.username,
          avatar: ''
        }}
      />
    </ImageBackground>
  )
}