
import { useAppDispatch,useAppSelector } from "../toolkit/store/hook";
import {connectionSocket,allActiveUser} from '../toolkit/slice/socketSlice'
import { useEffect } from "react";
import {socketIO }from '../toolkit/slice/socketSlice'
import chatItem from "../query/useChatItem";
const useScoket = () => {
    const {data} = chatItem()
    const dispatch = useAppDispatch()
    
    useEffect(()=> {
        socketIO.on('all-active-user',activeUser => {
            dispatch(allActiveUser(activeUser))
        })
    },[])
    const connectionsocket = (userId:string) => {
        dispatch(connectionSocket(userId))
    }
    return {
        connectionsocket,
    }
}


export default useScoket;