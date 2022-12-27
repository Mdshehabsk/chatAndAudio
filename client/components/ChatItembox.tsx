
import style from '../styles/chatItemBox.module.css'
const ChatItembox = ({children}:any) => {
  return (
    <div className={style.chat_item_box} >
              <div className={style.chat_item_box_container} >
                {children}
              </div>
            </div>
  )
}

export default ChatItembox