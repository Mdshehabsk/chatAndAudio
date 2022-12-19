import { useRouter } from 'next/router'
import {useEffect,useState,useRef} from 'react'
import style from '../styles/messageNavbar.module.css'
import avatar from ".././image/avatar.jpg";
import Image from 'next/image';
import currentUserDetails from '../query/useCurrentUserDetails';
import useCall from '../hooks/useCall';
import { socketIO } from '../toolkit/slice/socketSlice';
import { useAppSelector } from '../toolkit/store/hook';
const MessageNavbar = () => {
  const {callsend} = useCall()
  const router = useRouter()
  const {index} = router.query
  // @ts-ignore-next-line
 const {data,error,isLoading} = currentUserDetails(index)
 const backFn = () => {
  router.back()
 }
 const audioCallFn = () => {
  const data = {
    callType:'audioCall',
    connectedUserId: index,
    callStatus:'calling',
  }
  callsend(data)
 }
  return (
    <div className={style.message_navbar} >
                <div className={style.message_navbar_container} >
                <div className={style.left} >
                    <div className={style.backArrow_icon} onClick={backFn}  >
                    <i className='bx bx-arrow-back'></i>
                    
                    </div>
                  <div className={style.user_info} >
                 { data &&  <Image alt='image is missing ' src={data?.avatarImg} width={50} height={50} />}
                    <h1> {data?.name} </h1>
                  </div>
                </div>
                <div className={style.right} >
                  <div className={style.user_call_icons} >
                    <div className={style.audio} onClick={audioCallFn} id='audio_call'  >
                    <i className='bx bx-phone'></i>
                    </div>
                    <div className={style.video} >
                    <i className='bx bx-video'></i>
                    </div>
                    <div className={style.info} >
                    <i className='bx bx-info-circle'></i>
                    </div>
                  </div>
                </div>
                </div>
              </div>
  )
}

export default MessageNavbar