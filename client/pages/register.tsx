import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// @ts-ignore:next-line
import toast, { Toaster } from "react-hot-toast";
import style from "../styles/register.module.css";

import UserType from "../types/registerInputType";

import useRegisterMutaion from "../query/useRegister";

import { Circles } from "react-loader-spinner";

const Register = () => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [cpasswordShow, setCpasswordShow] = useState(false);

  const [inputVal, setInputVal] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    avatar: "",
  });
  const { mutate, data, error, isError, isSuccess ,isLoading} = useRegisterMutaion();
  if(isSuccess){
    toast.success(data.message, {
      duration: 4000,
      position: "top-center",
    });
    setTimeout(() => {
      router.push('/login')
    }, 4100);
  }
  const { name, email, password, cpassword, avatar } = inputVal;
  const inputChange = async (e: any) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };
  const avatarChange = async (e: any) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.files[0] });
  };
  const registerFormSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cpassword", cpassword);
    formData.append("avatar", avatar);
    mutate(formData);
  };
  console.log(isLoading)
  return (
    <>
      <div className={style.register_wrapper}>
        <Toaster />
        <Head>
          <title>Register</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          />
        </Head>
        <div className={style.register_div}>
          <h1 className={style.register_header}>Register</h1>
          <form
            className={style.register_form}
            autoComplete="off"
            onSubmit={registerFormSubmit}
          >
            <div className={style.register_input_field}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                id="username"
                placeholder="Enter your name"
                value={name}
                onChange={inputChange}
              />
              {error?.path === "name" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div className={style.register_input_field}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Your email @xxx.com"
                value={email}
                onChange={inputChange}
              />
              {error?.path === "email" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div className={style.register_input_field}>
              <label htmlFor="password">Password</label>
              <input
                type={`${passwordShow ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={inputChange}
              />
              <i
                className={`bx ${passwordShow ? "bx-show" : "bx-hide"} `}
                onClick={() => setPasswordShow(!passwordShow)}
              ></i>
              {error?.path === "password" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div className={style.register_input_field}>
              <label htmlFor="cpassword">Confirm-password</label>
              <input
                type={`${cpasswordShow ? "text" : "password"}`}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm password"
                value={cpassword}
                onChange={inputChange}
              />
              <i
                className={`bx ${cpasswordShow ? "bx-show" : "bx-hide"} `}
                onClick={() => setCpasswordShow(!cpasswordShow)}
              ></i>
              {error?.path === "cpassword" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div className={style.register_input_field}>
              <label htmlFor="avatar">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={avatarChange}
                name="avatar"
                id="avatar"
              />
            {error?.path === "avatar" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div  className={style.register_input_field}>
             
              {
                isLoading ? <Circles
                
                height="40"
                width="40"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                
              /> :  <input type="submit" value='Submit'/>
              }
            </div>
            <div className={style.register_input_field}>
              <span>
                You have alredy an account?{" "}
                <Link href="/login">Login here</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
