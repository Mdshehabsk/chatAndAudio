import Link from 'next/link'
import Head from 'next/head'
import style from '../styles/login.module.css'
import { useState ,useEffect} from 'react'

import { useRouter } from 'next/router';
import useLogin from '../query/useLogin';
import {getToken, setToken } from '../toolkit/slice/userAuthSlice';
import { useAppDispatch,useAppSelector } from '../toolkit/store/hook';
const Login = () => {
  const router = useRouter()
  const [passwordShow,setPasswordShow] = useState(false)
  interface User {
    email: string;
    password: string;
  }
  const [inputVal, setInputVal] = useState<User>({
    email: "",
    password: "",
  });
  const inputChange = async (e: any) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };
  const { mutate, data, error, isError, isSuccess } = useLogin()
  const dispatch = useAppDispatch()
  const {user} = useAppSelector((state:any) => state.userAuth)

  if(isSuccess){
    dispatch(setToken(data.token))
    // router.push('/login')
    window.location.href = '/'
  }

  useEffect(()=> {
    if(user){
      router.push('/')
    }
  },[router,user])
  const LoginFormSubmit = async (e:any) => {
    e.preventDefault()
    mutate(inputVal)
  }
  
  // useEffect(()=> {
  //   dispatch(getToken())
  //   if(user){
  //     router.push('/')
  //   }
  // },[])
  const {email,password} = inputVal
  return (
    <>
     <div className={style.login_wrapper} >
     <Head>
      <title>Login</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
     </Head>
        <div className={style.login_div} >
          <h1 className={style.login_header} >Login</h1>
          <form className={style.login_form} onSubmit={LoginFormSubmit} >
            <div className={style.login_input_field} >
              <label htmlFor="email">Email</label>
              <input type="text" name='email' id='email' value={email} onChange={inputChange} placeholder='Your email @xxx.com' />
              {error?.path === "email" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
            </div>
            <div className={style.login_input_field} >
              <label htmlFor="password">Password</label>
              <input type={passwordShow ?'text' : 'password'} name='password' value={password} id='password'onChange={inputChange} placeholder='Your password' />
              {error?.path === "password" && (
                <p className={style.error_msg}> {error.message} </p>
              )}
              <i className={`bx ${passwordShow ? 'bx-show' : 'bx-hide'} `} onClick={()=>setPasswordShow(!passwordShow)} ></i>
            </div>
            <div className={style.login_input_field} >
              <input type="submit" value='Login' />
            </div>
            <div className={style.login_input_field} >
              <span>
                <a>Forget password?</a>
                </span>
              <span>
                You dont have any account? <Link href='/register' >Register here</Link>
                </span>
            </div>
          </form>
        </div>
     </div>
    </>
  )
}

export default Login