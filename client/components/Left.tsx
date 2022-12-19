import Link from "next/link";
import React, { useState } from "react";
import chatItem from "../query/useChatItem";
import style from "../styles/left.module.css";
import { useAppSelector } from "../toolkit/store/hook";
import ChatItemType from "../types/chatItemTypes";
import ChatActiveUser from "./ChatActiveUser";
import ChatItembox from "./ChatItembox";
import ChatUser from "./ChatUser";
import Menubar from "./Menubar";
import Searchbar from "./Searchbar";
import Topbar from "./Topbar";
const Left = ({ styleCss }: { styleCss: any }) => {
  const [currentMenu, setCurrentMenu] = useState<number>(1);
  const { data, error } = chatItem();
  const { activeUser } = useAppSelector((state) => state.socket);
  const activeUserArr =
    data &&
    activeUser &&
    data.filter((user: any, ind: number) =>
      activeUser.some((x: any) => user._id == x.userId)
    );
  const activeMenuFn = (value: number) => {
    setCurrentMenu(value);
  };
  return (
    <div className={styleCss.left}>
      <div className={style.chat_box}>
        <Topbar />
        <Searchbar />
        <Menubar activeMenuFn={activeMenuFn} />
        {currentMenu === 1 && (
          <ChatItembox>
            {data &&
              data.map((user: ChatItemType, ind: number) => (
                <Link key={ind} href={`/user/${user._id}`}>
                  <ChatUser activeUserArr={activeUserArr} user={user} />
                </Link>
              ))}
          </ChatItembox>
        )}
        {currentMenu === 3 && (
          <ChatItembox>
            {data &&
              activeUserArr.map((user: ChatItemType, ind: number) => (
                <Link key={ind} href={`/user/${user._id}`}>
                  <ChatActiveUser user={user} />
                </Link>
              ))}
          </ChatItembox>
        )}
      </div>
    </div>
  );
};

export default Left;
