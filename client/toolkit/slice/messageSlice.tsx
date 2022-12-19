import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'

export const socketIO = io('http://localhost:4001')

interface socketStateType {
    recieveMessage:any | null,
}
const initialState : socketStateType = {
    recieveMessage:null,
}
const messageSlice = createSlice(({
    name:'messageSlice',
    initialState,
    reducers:{
        sendMessage: (state,action) => {
            const data = action.payload
            socketIO.emit('send-message',data)
        },
        recieveMessage : (state,action) => {
            state.recieveMessage = action.payload
        },
        reset : (state) => {
            state.recieveMessage = ''
        }
    },
}))

export {messageSlice};

export const {sendMessage,recieveMessage,reset} = messageSlice.actions

