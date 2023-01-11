


//internal import 
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Container from "../components/Container";
import style from '../styles/index.module.css'
import { getToken } from "../toolkit/slice/userAuthSlice";
import { useAppDispatch, useAppSelector } from "../toolkit/store/hook";
const Home = () => {
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
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      </Head>
      <Container styleCss= {style} />
    </>
  );
};

export default Home;
