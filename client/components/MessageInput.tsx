import { useState } from "react";
import style from "../styles/messageInput.module.css";
import {postChatMessage} from '../query/useCurrentChat'
import { useRouter } from "next/router";
import useMessage from "../hooks/useMessage";
import {useAppSelector } from "../toolkit/store/hook";
const MessageInput = () => {
  const {user} = useAppSelector(state => state.userAuth)
  const {sendMessageToSocket,typingMessage} = useMessage()
  const router = useRouter()
  const {index} = router.query
  const {mutate,data,error} = postChatMessage(index)
  const [messageVal, setMessageVal] = useState<string>("");
  const [inputFull, setInputFull] = useState<boolean>(false);
  const messageChange = async (e: any) => {
  
    if(e.target.value.length > 0 ) {
      typingMessage({
        receiverId:index,
        senderId:user.id,
        typing:true
      })
      setInputFull(true) 
    } else {
      setInputFull(false);
      typingMessage({
        receiverId:index,
        senderId:user.id,
        typing:false
      })
    }
    setMessageVal(e.target.value);
  };
  const messageSubmit = (e:any) => {
    e.preventDefault()
    typingMessage({
      receiverId:index,
      senderId:user.id,
      typing:false
    })
    if(messageVal.length < 0) {
      return
    }
    mutate(messageVal)
      const data = {
        text:messageVal,
        receiverId:index,
        senderId:user.id
      }
      //@ts-ignore-next-line
      sendMessageToSocket(data)
    setMessageVal('')
    setInputFull(false)
  }
  return (
    <div className={style.message_input}>
      <div className={style.message_input_container}>
        <div className={`${style.input_box} ${inputFull ? style.full : null}`}>
          <form onSubmit={messageSubmit} >
          <input
            type="text"
            name="message"
            placeholder="Type a message"
            value={messageVal}
            onChange={messageChange}
            autoComplete="off"
          />
          </form>
          <div className={`${inputFull ? style.show : style.send_icon}`} onClick={messageSubmit} >
            <i className="bx bx-send"></i> 
          </div>
        </div>
        {/* <div
          className={`${style.input_icon} ${inputFull ? style.none : null} `}
        >
          <div className={style.mic_icon}>
            <i className="bx bx-microphone"></i>
          </div>
          <div className={style.image}>
            <i className="bx bx-image"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MessageInput;
