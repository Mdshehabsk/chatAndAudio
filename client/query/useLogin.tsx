

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
const useLoginFn = async (formData: any) => {
  const data = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    formData
  );
  return data;
};

const useLogin = () => {
  const data: any = useMutation(useLoginFn);
  return {
    error: data.error?.response?.data,
    data: data.data?.data,
    mutate: data.mutate,
    isLoading: data.isLoading,
    isSuccess: data.isSuccess,
    isError: data.isError,
  };
};

export default useLogin;
