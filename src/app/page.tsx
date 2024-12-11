"use client";

import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import AuthGuard from "@/hoc/AuthGuard";
import useGetProducts from "@/hooks/api/product/useGetProducts";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function Home() {
  const [page, setPage] = useState<number>(1);

  const {
    data: products,
    meta,
    isLoading,
  } = useGetProducts({
    page,
    take: 10,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="container min-h-screen flex flex-col gap-8 mt-8 px-4 md:px-0">
      <div className="w-full h-48 md:h-72 bg-stone-300 rounded-3xl flex items-center justify-center">
        <p className="text-4xl md:text-9xl font-black text-center">
          PRODUCT LIST
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              name={product.name}
              stock={product.stock}
              price={product.price}
              thumbnail={product.thumbnail}
              productId={product.id}
              username={product.user.username}
            />
          );
        })}
      </section>

      <div className="mx-auto">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
}

export default AuthGuard(Home);
