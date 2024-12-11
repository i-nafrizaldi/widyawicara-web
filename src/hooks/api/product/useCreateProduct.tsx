"use client";

import useAxios from "@/hooks/useAxios";
import { Product } from "@/types/product.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";

interface CreateProductArgs {
  name: string;
  price: string;
  stock: string;
  thumbnail: File[];
}

const useCreateProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { axiosInstance } = useAxios();

  const createProduct = async (payload: CreateProductArgs) => {
    setIsLoading(true);
    try {
      const { name, price, stock, thumbnail } = payload;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      thumbnail.forEach((file: FileWithPath) => {
        formData.append("thumbnail", file);
      });

      await axiosInstance.post<Product>("/products", formData);
      toast.success("Create product success !");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createProduct, isLoading };
};
export default useCreateProduct;
