import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { getCurrentChat } from "../query/useCurrentChat";
import currentUserDetails from "../query/useCurrentUserDetails";
import style from "../styles/allMessage.module.css";
import { reset } from "../toolkit/slice/messageSlice";
import { useAppDispatch, useAppSelector } from "../toolkit/store/hook";
const AllMessage = () => {
  const dispatch = useAppDispatch()
  const div = useRef<any>();
  useEffect(() => {
    dispatch(reset())
  }, [])
  useEffect(() => {
    div.current.scrollTop = div.current.scrollHeight - div.current.clientHeight;
  })
  const { user } = useAppSelector((state) => state.userAuth);
  const { socketMessage, messageType } = useAppSelector(
    (state) => state.message
  );
  const router = useRouter();
  const { index } = router.query;
  const { data } = getCurrentChat(index);
  const { data: currentUser } = currentUserDetails(index);
  const message = data ? [...data, ...socketMessage] : null
  console.log(socketMessage)
  return (
    <div className={style.all_message}>
      <div className={style.all_message_container}>
        <div className={style.all_message_box} id="msg-box" ref={div} >

          {message &&
            message.map((msg: any, ind: number) => {
              return (
                <React.Fragment key={ind}>
                  {msg?.senderId === user.id ? (
                    <div className={style.my_message}>
                      <div className={style.message}>
                        <p> {msg?.text} </p>
                      </div>
                       <Image
                        src={user.avatarImg}
                        alt="no image"
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                  ) : (
                    <div className={style.your_message}>
                      {currentUser?.avatarImg && <Image
                        src={currentUser?.avatarImg}
                        alt="no image"
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%" }}
                      />}
                      <div className={style.message}>
                        <p> {msg?.text} </p>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          {/*                      
                     { 
                      socketMessage.length > 0 && socketMessage.map((elem:any,i:number)=> {
                        return (
                          <React.Fragment key={i}>
                          {elem?.senderId === user.id  && elem.recieverId === index ? (
                            <div className={style.my_message}>
                              <div className={style.message}>
                                <p> {elem?.text} </p>
                              </div>
                              <img
                                src={user?.avatarImg}
                                alt="no image"
                                width={30}
                                height={30}
                                style={{ borderRadius: "50%" }}
                              ></img>
                            </div>
                          ) : null}
                          {
                            elem?.senderId === index ?  <div className={style.your_message}>
                            <img
                              src={currentUser?.avatarImg}
                              alt="no image"
                              width={30}
                              height={30}
                              style={{ borderRadius: "50%" }}
                            ></img>
                            <div className={style.message}>
                              <p> {elem?.text} </p>
                            </div>
                          </div> : null
                          }
                        </React.Fragment>
                        )
                      })
                    } */}

        </div>
        {
          messageType ? <div className={style.typing_message} > {currentUser?.name} is typing.. </div> : null
        }
      </div>
    </div>

  );
};

export default AllMessage;
