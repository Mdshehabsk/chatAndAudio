import style from "../styles/chatUser.module.css";
import Image from "next/image";
import ChatItemType from "../types/chatItemTypes";
import { useRouter } from "next/router";
import { getCurrentChat } from "../query/useCurrentChat";
import { useAppSelector } from "../toolkit/store/hook";
import React from "react";
type propsType = {
  user: ChatItemType;
  activeUserArr: ChatItemType[];
};
const ChatUser = ({ user, activeUserArr }: propsType) => {
  const { socketMessage } = useAppSelector((state) => state.message);
  const { user: User } = useAppSelector((state) => state.userAuth);
  const { data } = getCurrentChat(user._id);
  const router = useRouter();
  const { index } = router.query;
  const message = data ? [...data, ...socketMessage] : null;
  const lastMessage = message && message[message.length - 1];
  return (
    <div
      className={`${style.chat_user} ${
        user?._id === index ? style.chat_user_active : ""
      } `}
    >
      <div className={style.left}>
        <Image
          src={user?.avatarImg}
          alt="no image"
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
        />
        {activeUserArr?.map((elem, ind: number) => {
          return user?._id == elem._id ? (
            <div key={ind} className={style.active_user}></div>
          ) : null;
        })}
        <div className={style.chat_user_info}>
          <h5> {user.name} </h5>
          <p>
            {(lastMessage?.senderId === User.id &&
              lastMessage?.receiverId === user._id) ||
            (lastMessage?.senderId === user._id &&
              lastMessage?.receiverId === User.id)
              ? lastMessage?.text?.slice(0,15)
              : data && data[data.length - 1]?.text?.slice(0,15)}..
          </p>
        </div>
      </div>
      {/* <div className={style.right}>
      </div> */}
    </div>
  );
};

export default React.memo(ChatUser);
