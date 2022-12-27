import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "./URL/base";
const useRegisterFn = async (formData: any) => {
  const data = await axios.post(
    `${API_BASE_URL}/api/auth/register`,
    formData
  );
  return data;
};

const useRegister = () => {
  const data: any = useMutation(useRegisterFn);
  return {
    error: data.error?.response?.data,
    data: data.data?.data,
    mutate: data.mutate,
    isLoading: data.isLoading,
    isSuccess: data.isSuccess,
    isError: data.isError,
  };
};

export default useRegister;
