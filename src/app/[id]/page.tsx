"use client";

import ModalConfirmationDeleteBlog from "@/components/ModalConfirmationDeleteBlog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthGuard from "@/hoc/AuthGuard";
import useDeleteProduct from "@/hooks/api/product/useDeleteProduct";
import useGetProduct from "@/hooks/api/product/useGetProduct";
import { useAppSelector } from "@/redux/hooks";
import { formatToCurrency } from "@/utils/formatter";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SkeletonProductDetail from "./components/SkeletonBlogDetail";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { id: userId } = useAppSelector((state) => state.user);

  const { product, isLoading } = useGetProduct(Number(params.id));

  const { deleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleDeleteProduct = () => {
    deleteProduct(Number(params.id));
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SkeletonProductDetail />
      </div>
    );
  }

  if (!product) return null;

  const isOwner = userId === product.userId;

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <header className="flex flex-col gap-5">
        <h1 className="text-4xl font-black">PRODUCT DETAIL</h1>
        <Separator />
      </header>

      <section className="grid grid-cols-2 gap-14 p-10">
        <div className="relative h-[400px] w-full">
          <Image
            src={product.thumbnail}
            fill
            alt="Thumbnail image"
            className="object-cover bg-slate-200 rounded-3xl"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <h1 className="text-2xl">{product.user.username}</h1>
          <p className="text-4xl font-black text-green-400">
            {formatToCurrency(product.price)}
          </p>
          <p className="text-lg">Stock: {product.stock}</p>

          {isOwner && (
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setModalOpen(true)}
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? "Loading" : <Trash2 size="20px" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/${params.id}/edit`)}
              >
                <Edit size="20px" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <ModalConfirmationDeleteBlog
        open={isModalOpen}
        setOpen={setModalOpen}
        onDeleteBlog={handleDeleteProduct}
        isLoadingDelete={isLoadingDelete}
      />
    </main>
  );
};

export default AuthGuard(ProductDetail);
