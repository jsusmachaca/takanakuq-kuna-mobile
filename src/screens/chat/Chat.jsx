import { useState, useEffect, useCallback } from "react"
import { ImageBackground } from "react-native"
import { useSQLiteContext } from 'expo-sqlite'
import { GiftedChat } from "react-native-gifted-chat"
import { apiClient } from "../../utils/api/client"
import io from 'socket.io-client'


export const Chat = () => {
  const db = useSQLiteContext()
  const [messages, setMessages] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [result] = await db.getAllAsync('SELECT * FROM user')
        const token = result.token
        
        const newSocket = io('https://takanakuqkuna.com', {
          extraHeaders: {
            token: token
          }
        })

        newSocket.on('connect', () => {
          console.log('Connected to server')
        })

        newSocket.on('bot', (message) => {
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

        setSocket(newSocket);

        const res = await apiClient.get('/api/user/data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUserInfo(res.data)
      } catch (err) {
        console.error(err.message)
      }
    }

    fetchUserInfo()

    return () => {
      if (socket) {
        socket.off('bot')
        socket.disconnect()
      }
    }
  }, [db])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    if (socket) {
      socket.emit('chatbot', messages[0].text)
    }
  }, [socket])

  return (
    <ImageBackground source={require('./assets/bg.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: userInfo.username
        }}
      />
    </ImageBackground>
  )
}