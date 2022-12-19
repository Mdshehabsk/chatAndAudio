import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
import { useAppSelector } from "../toolkit/store/hook";
const currentUserDetails = (userId:any ) => {
  const { token, user } = useAppSelector((state) => state.userAuth);
  const data:any = useQuery(["current-user-details",userId], () => {
    return axios.get(`${API_BASE_URL}/api/user-details/profile/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },{refetchOnWindowFocus:false,enabled: !!userId,});
  return {
    isLoading: data.isLoading,
    isFetching: data.isFetched,
    error: data.error?.response.data,
    data:data.data?.data,
    isError:data.isError
  };
};

export default currentUserDetails;