import style from "../styles/chatUser.module.css";
import Image from "next/image";
import avatar from "../image/avatar.jpg";
import ChatItemType from "../types/chatItemTypes";
import Link from "next/link";
import { useRouter } from "next/router";
type propsType = {
  user: ChatItemType;

};
const ChatActiveUser = ({ user }: propsType) => {
  const router = useRouter()
  const {index} = router.query;
  return (
    <div className={`${style.chat_user} ${user?._id === index ? style.chat_user_active : ''} `}>
      <div className={style.left}>
        <Image
          src={user?.avatarImg}
          width={50}
          height={50}
          alt="no image"
        ></Image>

          <div className={style.active_user} ></div>

        <div className={style.chat_user_info}>
          <h5> {user.name} </h5>
          <p>Hello vai</p>
        </div>
      </div>
      <div className={style.right}>
        <h5> {"nice"} </h5>
      </div>
    </div>
  );
};

export default ChatActiveUser;
