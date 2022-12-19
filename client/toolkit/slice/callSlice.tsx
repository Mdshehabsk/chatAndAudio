import { createSlice } from "@reduxjs/toolkit";
import {socketIO} from './socketSlice'
interface callType {
    callType: "audioCall" | "videoCall" | null
    callStatus : "calling" | 'incomingCall' | 'reject' | 'accept' | null
    connectedUserId: string,
    callModal :boolean,
    callPageModal : boolean,
    myId:string
    connectedUserSocketId: string
}

const initialState : callType = {
    callType: null,
    callStatus:null,
    connectedUserId:'',
    connectedUserSocketId : '',
    myId:'',
    callModal:false,
    callPageModal:false,
}


const callSlice = createSlice({
    name:"callSlice",
    initialState,
    reducers: {
        //call send by caller
        callSend : (state,action) => {
           const {callType,callModal,connectedUserId,callStatus,myId} = action.payload
           state.callType = callType;
           state.callModal= true;
           state.callStatus = callStatus;
           state.connectedUserId = connectedUserId
           socketIO.emit('call-send',{
            connectedUserId,
            callStatus,
            callType,
            myId
           })
        },
        // call receive 
        callReceive : (state,action) => {
            const {connectedUserId,connectedUserSocketId,callType} = action.payload
            state.connectedUserId = connectedUserId;
            state.connectedUserSocketId = connectedUserSocketId;
            state.callStatus = 'incomingCall';
            state.callModal = true
            state.callType = callType
        },
        // call receive by receiver 
        acceptCallHander : (state,action) => {
            const connectedUserId = action.payload
            state.callModal = false,
            state.callPageModal = true
            state.callStatus = 'accept',
            socketIO.emit('accept-call-by-receiver',{
                connectedUserId,
            })
        },
        callAcceptByReceiver : (state,action) => {
            state.callModal = false
            state.callPageModal = true
            const connectedUserSocketId = action.payload
            state.connectedUserSocketId = connectedUserSocketId
        },
        removeCallModal : state => {
            state.callModal = false
        }
    }
})

export const {callSend,callReceive,removeCallModal,acceptCallHander,callAcceptByReceiver} = callSlice.actions
export default callSlice.reducer;