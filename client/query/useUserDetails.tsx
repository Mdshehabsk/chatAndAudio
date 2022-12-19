import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
import { useAppSelector } from "../toolkit/store/hook";
const userDetails = () => {
  const { token, user } = useAppSelector((state) => state.userAuth);
  const data:any = useQuery(["user-details"], () => {
    return axios.get(`${API_BASE_URL}/api/user-details/profile/${user.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },{refetchOnWindowFocus:false});
  return {
    isLoading: data.isLoading,
    isFetching: data.isFetched,
    error: data.error?.response.data,
    data:data.data?.data,
    isError:data.isError,
  };
};

export default userDetails;
