import { useCallback, useRef, useState } from "react";

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
let peerConnection:RTCPeerConnection | any
const useRTC = () => {
  const local = useRef(null);
  console.log('render')
  const createPeerConnection = async () => {
   peerConnection =  useCallback(()=>new RTCPeerConnection(configuration),[])
    peerConnection.onicecandidate = (event: { candidate: any }) => {
      if (event.candidate) {
        console.log(event.candidate);
      }
    };
    peerConnection.onsignalingstatechange = () => {
      if (peerConnection.connectionState === "connected") {
        console.log(`successfull connected to other user`);
      }
    };
    // localStream.current.getTracks().forEach((track: any) => {
    //     peerConnection.current.current.addTrack(track, localStream);
    //   });
    // const newStream = new MediaStream();
    // peerConnection.current.ontrack = (event: { track: MediaStreamTrack }) => {
    //   newStream.addTrack(event.track);
    // };
};
console.log(peerConnection)
   
  return {
    createPeerConnection,
  };
};

export default useRTC;
