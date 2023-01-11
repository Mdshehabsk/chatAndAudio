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


import useCall from "../../hooks/useCall";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../toolkit/store/hook";
import currentUserDetails from "../../query/useCurrentUserDetails";
import { useRouter } from "next/router";

const Room = () => {
  const [micToggle, setMicToggle] = useState(false);
  const local = useRef<any>();
  const remote = useRef<any>();
const { localStream, remoteStream,audioToggle,hangUpCall } = useCall();
  useEffect(() => {
    local.current.srcObject = localStream;
    remote.current.srcObject = remoteStream;
  }, []);
  const router = useRouter();
  const { index } = router.query;
  const { data } = currentUserDetails(index);
  const { callType } = useAppSelector((state) => state.call);
  const { user } = useAppSelector((state) => state.userAuth);
  const { avatarImg } = user;

  const toggleMuterMicrophone = async (e: any) => {
    setMicToggle(!micToggle);
    audioToggle(!micToggle)
  };
  
  return (
    <>
      <div className={style.call_page_modal}>
        <div className={style.container}>
          <div className={style.call_room}>
            <div className={style.call_room_container}>
              {callType === "audioCall" ? (
                <div className={style.audio_call_room}>
                  <div className={style.left}>
                    <Image src={avatarImg} alt="no image" width={50} height={50} />
                    <div className={style.local_stream}>
                      <audio ref={local} muted autoPlay></audio>
                    </div>
                  </div>

                  <div className={style.right}>
                    <Image src={data?.avatarImg} alt="no image" width={50} height={50} />
                    <div className={style.remote_stream}>
                      <audio ref={remote} autoPlay></audio>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className={style.call_icons}>
            <div className={`${style.icon} ${style.microphone} `} onClick={toggleMuterMicrophone}>
              {micToggle ? (
                <Image src={microphoneOff} alt="no image" />
              ) : (
                <Image src={microphone} alt="no image" />
              )}
            </div>
            <div className={`${style.icon} ${style.hangup}`} onClick={hangUpCall} >
              <Image src={hangup} alt="no image" />
            </div>
            {/* <div className={`${style.icon} ${style.video}`}> */}
            {/*   <Image src={video} alt="no image" /> */}
            {/* </div> */}
            {/* <div className={`${style.icon} ${style.monitor}`}>
              <Image src={monitor} alt="no image" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
