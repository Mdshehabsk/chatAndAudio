
import { useAppDispatch,useAppSelector } from "../toolkit/store/hook";
import {sendMessage, recieveMessage,messageType} from '../toolkit/slice/socketSlice'
import { useEffect } from "react";
import {socketIO }from '../toolkit/slice/socketSlice'
import chatItem from "../query/useChatItem";
const useMessage = () => {
    const {data} = chatItem()
    const dispatch = useAppDispatch()
    useEffect(()=> {
        socketIO.on('send-message-to-reciever',data => {
            dispatch(recieveMessage(data))
        })
    },[])
    useEffect(()=> {
        socketIO.on('typing-message', data => {
            dispatch(messageType(data.typing))
        })
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