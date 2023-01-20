
import { useAppDispatch } from "../toolkit/store/hook";
import {sendMessage, recieveMessage,messageType} from '../toolkit/slice/messageSlice'
import { useEffect } from "react";
import {socketIO }from '../toolkit/slice/socketSlice'
import chatItem from "../query/useChatItem";
const useMessage = () => {
    const dispatch = useAppDispatch()
   
    useEffect(()=> {
        const sendMessageToReceiver = (data: any) => {
            dispatch(recieveMessage(data))
        }
        socketIO.on('send-message-to-receiver',sendMessageToReceiver)

        return function () {
            socketIO.off('send-message-to-receiver',sendMessageToReceiver)
        }
    },[])
    useEffect(()=> {
        const typingMessage = (data: { typing: any; }) => {
            dispatch(messageType(data.typing))
        }
        socketIO.on('typing-message', typingMessage)
        return function () {
            socketIO.off('typing-message',typingMessage)
        }
    },[])
    const typingMessage = (data: any) => {
        socketIO.emit('typing-message',data)
    }   
    const sendMessageToSocket = (data:{message:string,recieverId:string | any,senderId:string}) => {
        dispatch(sendMessage(data))
    }
    return {
        sendMessageToSocket,
        typingMessage
    }
}


export default useMessage;