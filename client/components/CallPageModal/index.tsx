import style from "../../styles/callRoom.module.css";
import Image from "next/image";
// all icon import
import microphone from "../../icons/microphone.png";
import microphoneOff from "../../icons/micrphone-off.png";
import hangup from "../../icons/hangup.png";
import video from "../../icons/video.png";
import videoOff from "../../icons/video-off.png";
import monitor from "../../icons/monitor.png";
import monitorOff from "../../icons/micrphone-off.png";

// all icon import
import { socketIO } from "../../toolkit/slice/socketSlice";

import useCall from "../../hooks/useCall";
import { useEffect, useRef } from "react";
const configuration = {
  iceServers :[
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
  ]
}
const Room = () => {
  const local = useRef<any>()
  const remote = useRef<any>()
  const {localStream,remoteStream} = useCall()
  useEffect(()=> {
    local.current.srcObject = localStream
    remote.current.srcObject = remoteStream
  },[])
  return (
    <>
      <div className={style.call_page_modal}>
        <div className={style.container}>
          <div className={style.local_stream}>
            <audio ref={local} muted autoPlay></audio>
          </div>
          <div className={style.remote_stream}>
            <audio ref={remote} autoPlay></audio>
          </div>
          <div className={style.call_icons}>
            <div className={`${style.icon} ${style.microphone} `}>
              <Image src={microphone} alt="no image" />
            </div>
            <div className={`${style.icon} ${style.hangup}`}>
              <Image src={hangup} alt="no image" />
            </div>
            <div className={`${style.icon} ${style.video}`}>
              <Image src={video} alt="no image" />
            </div>
            <div className={`${style.icon} ${style.monitor}`}>
              <Image src={monitor} alt="no image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
