//internal import
import Head from "next/head";
//external import
import style from '../../styles/index2.module.css'

import Container from "../../components/Container";
const User = () => {
  
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
