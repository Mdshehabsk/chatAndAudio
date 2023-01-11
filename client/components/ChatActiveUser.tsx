import style from "../styles/chatUser.module.css";
import Image from "next/image";
import avatar from "../image/avatar.jpg";
import ChatItemType from "../types/chatItemTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../toolkit/store/hook";
import { getCurrentChat } from "../query/useCurrentChat";
import React from "react";
type propsType = {
  user: ChatItemType;
};


const ChatActiveUser = ({ user }: propsType) => {
  const { socketMessage } = useAppSelector((state) => state.message);
  const { user: User } = useAppSelector((state) => state.userAuth);
  const { data } = getCurrentChat(user._id);
  const router = useRouter();
  const { index } = router.query;
  const message = data ? [...data, ...socketMessage] : null;
  const lastMessage = message && message[message.length - 1];
  return (
    <div className={`${style.chat_user} ${user?._id === index ? style.chat_user_active : ''} `}>
      <div className={style.left}>
        <Image
          src={user?.avatarImg}
          width={50}
          height={50}
          alt="no image"
          style={{objectFit:'cover'}}
        ></Image>

          <div className={style.active_user} ></div>

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
        <h5> {"nice"} </h5>
      </div> */}
    </div>
  );
};

export default React.memo(ChatActiveUser);
