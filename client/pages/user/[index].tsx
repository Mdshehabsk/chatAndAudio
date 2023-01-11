//internal import
import Head from "next/head";
//external import
import style from '../../styles/index2.module.css'

import Container from "../../components/Container";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../toolkit/store/hook";
import { useEffect } from "react";
import { getToken } from "../../toolkit/slice/userAuthSlice";
const User = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.userAuth)
  useEffect(()=>{
    dispatch(getToken())
    if(!user){
      router.push('/login')
    }
  },[])
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Container styleCss={style} />
    </>
  );
};

export default User;
