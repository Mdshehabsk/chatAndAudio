import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'

export const socketIO = io('http://localhost:4001')

interface socketStateType {
    messageType:false
    socketMessage:any
}
const initialState : socketStateType = {
    socketMessage:[],
    messageType:false
}
const messageSlice = createSlice(({
    name:'messageSlice',
    initialState,
    reducers:{
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
    },
}))

export {messageSlice};

export const {sendMessage,recieveMessage,messageType} = messageSlice.actions

export default messageSlice.reducer

