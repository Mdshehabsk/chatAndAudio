import { createSlice } from "@reduxjs/toolkit";

interface socketStateType {
    localStream : any,
}
const initialState : socketStateType = {
    localStream : null
}
const RTCSlice = createSlice(({
    name:'RTCSlice',
    initialState,
    reducers:{
        setLocalStream : (state,action)  => {
             
        }
    },
}))

export const {setLocalStream} = RTCSlice.actions

export default RTCSlice.reducer