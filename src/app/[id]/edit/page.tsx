"use client";

import AuthGuard from "@/hoc/AuthGuard";
import FormEditProduct from "./components/ProductEditForm";

const EditProduct = ({ params }: { params: { id: number } }) => {
  return (
    <div className="w-full flex flex-col gap-4 my-10 container">
      <FormEditProduct id={params.id} />
    </div>
  );
};

export default AuthGuard(EditProduct);
