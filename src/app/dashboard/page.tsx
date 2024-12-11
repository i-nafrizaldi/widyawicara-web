"use client";

import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/hoc/AuthGuard";
import useGetProducts from "@/hooks/api/product/useGetProducts";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Dashboard() {
  const router = useRouter();

  const { id } = useAppSelector((state) => state.user);

  const [page, setPage] = useState<number>(1);

  const {
    data: products,
    meta,
    isLoading,
  } = useGetProducts({
    page,
    take: 10,
    userId: id,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="container min-h-screen p-10 flex flex-col gap-8">
      <div className="w-full h-72 bg-stone-300 rounded-3xl place-content-center">
        <p className="text-9xl font-black text-center ">DASHBOARD</p>
      </div>

      <div className="flex ">
        <Button
          className="font-bold ml-auto"
          onClick={() => router.push("/dashboard/create")}
        >
          Add Product
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className=" animate-spin" />
        </div>
      )}
      <section className=" grid grid-cols-5 gap-5">
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
export default AuthGuard(Dashboard);
