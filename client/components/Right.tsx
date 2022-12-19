import React from 'react'
import style from '../styles/right.module.css'
import AllMessage from './AllMessage'
import MessageInput from './MessageInput'
import MessageNavbar from './MessageNavbar'
const Right = ({styleCss}:{styleCss:any}) => {
  return (
    <div className={styleCss.right}>
          <div className={styleCss.message_box}>
            <MessageNavbar />
            <AllMessage />
            <MessageInput />
          </div>
        </div>
  )
}

export default Right