"use client";

import useAxios from "@/hooks/useAxios";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";

const useGetProduct = (id: number) => {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { axiosInstance } = useAxios();

  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      setData(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return { product: data, isLoading, refetch: getProduct };
};
export default useGetProduct;
