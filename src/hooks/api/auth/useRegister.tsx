"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterResponse {
  message: string;
  data: User;
}

interface RegisterArgs {
  username: string;
  password: string;
  email: string;
  gender: String;
}

const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        payload
      );

      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
};
export default useRegister;
