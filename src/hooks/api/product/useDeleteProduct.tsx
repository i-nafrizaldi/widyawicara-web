"use client";

import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { axiosInstance } = useAxios();

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Delete product success!");
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteProduct, isLoading };
};
export default useDeleteProduct;
