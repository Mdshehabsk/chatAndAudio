


//internal import 
import Head from "next/head";
import Container from "../components/Container";
import style from '../styles/index.module.css'
const Home = () => {
  
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
