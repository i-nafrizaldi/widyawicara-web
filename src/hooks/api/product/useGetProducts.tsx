"use client";

import useAxios from "@/hooks/useAxios";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";

interface IGetProductsQuery extends IPaginationQueries {
  search?: string;
  take: number;
  userId?: number;
}

const useGetProducts = (queries: IGetProductsQuery) => {
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { axiosInstance } = useAxios();

  const getProductList = async () => {
    try {
      const { data } = await axiosInstance.get("/products", {
        params: queries,
      });
      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductList();
  }, [queries.page, queries.search]);

  return { data, meta, isLoading };
};

export default useGetProducts;
