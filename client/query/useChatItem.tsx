import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
import { useAppSelector } from "../toolkit/store/hook";

  

const chatItem = () => {
    const { token } = useAppSelector((state) => state.userAuth);
    const data:any = useQuery(['chat-item'],()=> {
        return axios.get(`${API_BASE_URL}/api/user/chat-item`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
    },{refetchOnWindowFocus:false})
    return {
        isLoading: data.isLoading,
        isFetching: data.isFetched,
        error: data.error?.response?.data,
        data:data.data?.data,
        isError:data.isError
      };
}

export default chatItem;