"use client";

import { axiosInstance } from "@/lib/axios";
import { loginAction } from "@/redux/slices/userSlice";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface LoginArgs {
  username: string;
  password?: string;
}
const useLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (payload: LoginArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", payload);

      toast.success("Login Succcess !");
      dispatch(loginAction(data));
      localStorage.setItem("storage", JSON.stringify(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
