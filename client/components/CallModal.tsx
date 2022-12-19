import { ReactFragment, useEffect, useState, useRef,useContext } from "react";
import style from "../styles/callModal.module.css";
import { useAppSelector, useAppDispatch } from "../toolkit/store/hook";
import Image from "next/image";
import avatar from "../image/avatar.jpg";
import Buttons from "./Buttons";
import { memo } from "react";
import currentUserDetails from "../query/useCurrentUserDetails";
import useCall from "../hooks/useCall";
import { removeCallModal } from "../toolkit/slice/callSlice";

const CallModal = () => {
  const {acceptCall} = useCall()
  const {connectedUserId,callStatus} = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();
  const acceptCallHandler = async () => {
    acceptCall(connectedUserId)
  };
  const rejectCallHandler = () => {
    dispatch(removeCallModal())
  };
  useEffect(()=> {
    setTimeout(() => {
      dispatch(removeCallModal())
    }, 6000);
  },[])
  let callModal;

  if (callStatus === "calling") {
    const { data: currentUser } = currentUserDetails(connectedUserId);
    callModal = (
      <div className={style.call_modal_container}>
        <Image
          src={currentUser?.avatarImg}
          width={80}
          height={80}
          alt="image missing"
        ></Image>
        <h2>Youre calling {currentUser?.name} </h2>
        <div className={style.buttons}>
          <Buttons btnFun={rejectCallHandler} background="red">
            Reject
          </Buttons>
        </div>
      </div>
    );
  }
  if (callStatus === "incomingCall") {
    const { data: currentUser } = currentUserDetails(connectedUserId);
    callModal = (
      <div className={style.call_modal_container}>
        <Image
          src={currentUser?.avatarImg}
          width={80}
          height={80}
          alt="image missing"
        ></Image>
        <h2>{currentUser?.name} is calling you </h2>
        <div className={style.buttons}>
          <Buttons btnFun={acceptCallHandler} background="green">
            Accept
          </Buttons>
          <Buttons btnFun={rejectCallHandler} background="red">
            Reject
          </Buttons>
        </div>
      </div>
    );
  }

  return <div className={style.call_modal}>{callModal}</div>;
};

export default memo(CallModal);
