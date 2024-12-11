"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDeleteProduct from "@/hooks/api/product/useDeleteProduct";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteProductProps {
  id: number;
  refetch: () => void;
}

export function DeleteProduct({ id, refetch }: DeleteProductProps) {
  const { deleteProduct } = useDeleteProduct();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(id), refetch();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Trash2
          size={20}
          className="text-red-500 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
