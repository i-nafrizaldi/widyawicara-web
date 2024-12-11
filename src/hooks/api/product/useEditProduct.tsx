"use client";

import useAxios from "@/hooks/useAxios";
import { Product } from "@/types/product.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";

interface EditProductArgs {
  name?: string;
  price?: string;
  stock?: string;
  thumbnail?: File[];
}

const useEditProduct = (id: number) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { axiosInstance } = useAxios();

  const editProduct = async (payload: Partial<EditProductArgs>) => {
    setIsLoading(true);
    try {
      const { name, price, stock, thumbnail } = payload;
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (price) formData.append("price", price);
      if (stock) formData.append("stock", stock);
      if (thumbnail && thumbnail.length > 0)
        thumbnail.forEach((file: FileWithPath) => {
          formData.append("thumbnail", file);
        });

      await axiosInstance.patch<Product>(`/products/${id}`, formData);
      toast.success("Edit product success !");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editProduct, isLoading };
};
export default useEditProduct;
