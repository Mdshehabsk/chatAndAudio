import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
import { useAppSelector } from "../toolkit/store/hook";

const getCurrentChat = (userId: string | any) => {
  const { token } = useAppSelector((state) => state.userAuth);
  const data: any = useQuery(
    ["get-current-chat",userId],
    () => {
      return axios.get(`${API_BASE_URL}/api/user/conversation/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    { refetchOnWindowFocus: false, enabled: !!userId }
  );
  return {
    isLoading: data.isLoading,
    isFetching: data.isFetched,
    error: data.error?.response?.data,
    data: data.data?.data,
    isError: data.isError,
  };
};

const postChatMessage = (recieverId:string | any) => {
  const { token } = useAppSelector((state) => state.userAuth);
  const data: any = useMutation((message) => {
    return axios.post(
      `${API_BASE_URL}/api/user/new-message/${recieverId}`,
      { message },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  });
  return {
    isLoading: data.isLoading,
    isFetching: data.isFetched,
    error: data.error?.response?.data,
    data: data.data?.data,
    isError: data.isError,
    mutate: data.mutate,
  };
};
export { getCurrentChat, postChatMessage };
// ,{onSuccess : () => queryClient.invalidateQueries(["get-current-chat"])}