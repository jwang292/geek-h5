import Icon from '../../../componets/Icon'
import Input from '../../../componets/input'
import NavBar from '../../../componets/NavBar'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import io from 'socket.io-client'
import { getTokenInfo } from '../../../utils/storage'
import { useEffect } from 'react'

const Chat = () => {
  const history = useHistory()
  const photo = useSelector((state) => state.profile.user.photo)
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: 'hi,小智为你服务' },
    { type: 'user', text: 'hi' },
  ])
  const [msg, setMsg] = useState('')
  const clientRef = useRef(null)
  //   const listRef = useRef(null)
  //socket part
  useEffect(() => {
    clientRef.current = io('http://geek.itheima.net', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    })
    //链接服务器成功的事件
    clientRef.current.on('connect', () => {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: 'connect successful' },
      ])
    })
    //接受服务器消息的事件
    clientRef.current.on('message', (e) => {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: e.msg },
      ])
    })

    return () => {
      clientRef.current.close()
    }
  }, [])

  //   useEffect(() => {
  //     listRef.current.scrollTop = listRef.current.scrollHeight
  //   }, [messageList])

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'user', text: msg },
      ])
      //给服务器发消息，根据后端要求第一个参数‘message’
      clientRef.current.emit('message', {
        msg,
        timestamp: Date.now(),
      })
      //清空输入框
      setMsg('')
    } else {
      return
    }
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header">小智同学</NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            // 机器人的消息
            return (
              <div className="chat-item" key={item.index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            // 用户的消息
            return (
              <div className="chat-item user" key={item.index}>
                <img
                  src={
                    photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
          onKeyUp={onKeyUp}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
