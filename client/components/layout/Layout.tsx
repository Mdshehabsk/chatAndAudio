import { useRouter } from "next/router"
import { useAppDispatch ,useAppSelector} from "../../toolkit/store/hook"
import { useEffect } from "react"
import { getToken } from "../../toolkit/slice/userAuthSlice"
import useScoket from '../../hooks/useSocket'

const Layout = ({children}:any) => {
  const {connectionsocket}  = useScoket()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.userAuth)
  useEffect(()=>{
    dispatch(getToken())
    if(!user){
      router.push('/login')
    }
  },[])
  useEffect(()=> {
    if(user){
      connectionsocket(user.id)
    }
  },[])
  return (
    <>
        {children}
    </>
  )
}

export default Layout;
