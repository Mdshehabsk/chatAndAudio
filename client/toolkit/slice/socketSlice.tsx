import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'
const SOCKET_URL = 'http://localhost:4001'
export const socketIO = io(SOCKET_URL)
interface socketStateType {
    activeUser:null | any,
    socketMessage: any,
    messageType:boolean
}
const initialState : socketStateType = {
    activeUser:null,
    socketMessage:[],
    messageType:false
}
const socketSlice = createSlice(({
    name:'socketSlice',
    initialState,
    reducers:{
        connectionSocket : (state,action) => {
            const userId = action.payload
            socketIO.emit('add-user',{userId})
        },
        allActiveUser : (state,action) => {
            state.activeUser = action.payload
        },
        sendMessage: (state,action) => {
            const data = action.payload
            state.socketMessage.push(data)
            socketIO.emit('send-message',data)
        },
        messageType : (state,action) => {
            state.messageType = action.payload
        },
        recieveMessage : (state,action) => {
            state.socketMessage.push(action.payload)
        },
        
        reset : (state) => {
            state.socketMessage = ''
        }
    },
}))

export const {connectionSocket,allActiveUser,sendMessage,messageType,recieveMessage,reset} = socketSlice.actions

export default socketSlice.reducer