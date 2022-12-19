import {useState,useEffect} from 'react'
import style from '../styles/topBar.module.css'
import avatar from ".././image/avatar.jpg";
import Image from 'next/image';
import { getToken, removeToken } from '../toolkit/slice/userAuthSlice'
import { useAppDispatch,useAppSelector } from '../toolkit/store/hook'
import { useRouter } from 'next/router';
import userDetails from '../query/useUserDetails';
const Topbar = () => {

  const {isLoading,isFetching,data,error,isError} = userDetails()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [theme,setTheme] = useState<null | string>('dark-theme')
  const themSwitcher = async () => {
    if(theme === 'dark-theme') {
      localStorage.setItem('theme','light-theme' )
      setTheme('light-theme')
    }else {
      localStorage.setItem('theme','dark-theme' )
      setTheme('dark-theme')
    }
  }
  useEffect(()=> {
    const Theme = localStorage.getItem('theme')
    setTheme(Theme)
    Theme === 'dark-theme' ? document.body.classList.add('white-mode') : document.body.classList.remove('white-mode') 
   },[theme])
   const logout = async () => {
      dispatch(removeToken())
      router.push('/login')
   }
  return (
    <div className={style.top_bar}>
              <div className={style.top_bar_container}>
                <div className={style.left}>
                  {data && <Image src={data.avatarImg } width={50} height={50} alt='image is missing' />}
                  <p className={style.name}> {data?.name} </p>
                </div>
                <div className={style.right}>
                  <div className={style.theme_icon} onClick={themSwitcher} >
                  {theme === 'light-theme' ? <i className='bx bx-sun'></i> : <i className='bx bx-moon'></i>}
                  </div>
                  <div className={style.menu_icon} onClick={logout} >
                  <i className='bx bx-dots-horizontal-rounded'></i>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Topbar
