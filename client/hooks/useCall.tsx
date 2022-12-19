import { useAppDispatch, useAppSelector } from "../toolkit/store/hook";
import {
  callSend,
  callReceive,
  acceptCallHander,
  callAcceptByReceiver,
  removeCallModal,
} from "../toolkit/slice/callSlice";
import { useCallback, useEffect, useMemo } from "react";
import { socketIO } from "../toolkit/slice/socketSlice";
const configuration = {
  iceServers: [
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};
let peerConnection: RTCPeerConnection,localStream : MediaStream,remoteStream:MediaStream
// here is the audio stream
const getLocalAudio = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true})
    localStream = stream
  }catch(err){
    console.log(err)
  }

}
const createPc = async (connectedUserSocketId?:string) => {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      sendWebRTCOfferUsingSignaling({
        type:'iceCandidate',
        candidate:event.candidate,
        connectedUserSocketId
      })
    }
  };
  peerConnection.onsignalingstatechange = (_event) => {
    if (peerConnection.connectionState === "connected") {
      console.log(`successfull connected to other user`);
    }
  };
  remoteStream = new MediaStream()
  peerConnection.ontrack = event => {
    remoteStream.addTrack(event.track)
  }
  localStream?.getTracks().forEach((track: MediaStreamTrack) => {
    peerConnection.addTrack(track,localStream)
  })
  
};
socketIO.on('webRTC-signaling',data => {
  switch(data.type){
    case 'offer':
      handleWebRTCOffer(data)
    break;
    case 'answer':
      handleWebRTCAnswer(data)
    break;
    case 'iceCandidate':
      handleWebRTCCandidate(data)
  }
})
const sendWebRTCOfferUsingSignaling = (data: any) => {
  socketIO.emit("webRTC-signaling", data);
};
const sendRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  peerConnection.setLocalDescription(offer);
  return offer
};
const handleWebRTCOffer = async (data: any) => {
  try {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendWebRTCOfferUsingSignaling({
      connectedUserSocketId: data.connectedUserSocketId,
      type: "answer",
      answer,
    });
  } catch (err) {
    console.log(err);
  }
};
const handleWebRTCAnswer = async (data: any) => {
 try {
  await peerConnection.setRemoteDescription(data.answer);
 }catch(err){
  console.log(err)
 }
};
const handleWebRTCCandidate = async (data: any) => {
  try {
    await peerConnection.addIceCandidate(data.candidate)
  }
  catch(err){
    console.log(err)
  }
}

const useCall = () => {
  const dispatch = useAppDispatch();
  const { connectedUserSocketId } = useAppSelector((state) => state.call);
  const { user } = useAppSelector((state) => state.userAuth);
  const callsend = (data: any) => {
    getLocalAudio()
    dispatch(
      callSend({
        ...data,
        myId: user.id,
      })
    );
  };
  const acceptCall = async (connectedUserId: string) => {
    dispatch(acceptCallHander(connectedUserId));
    createPc(connectedUserSocketId);
    const offer = await sendRTCOffer();
    sendWebRTCOfferUsingSignaling({
      type: "offer",
      offer,
      connectedUserSocketId,
    });
    
  };
  useEffect(() => {
    socketIO.on("call-receive", (data) => {
      getLocalAudio()
      dispatch(callReceive(data));
    });
  }, []);
  useEffect(() => {
    socketIO.on("accept-call-by-receiver", (data) => {
      const { connectedUserSocketId } = data;
      createPc(connectedUserSocketId)
      dispatch(callAcceptByReceiver(connectedUserSocketId));
    });
  }, []);
  return {
    callsend,
    acceptCall,
    localStream,
    remoteStream
  };
};

export default useCall;

