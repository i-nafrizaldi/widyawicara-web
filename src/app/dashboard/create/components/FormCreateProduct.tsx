"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useCreateProduct from "@/hooks/api/product/useCreateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "../validationSchema";

interface FormCreateProduct {
  name: string;
  price: string;
  stock: string;
  thumbnail: File[];
}

const FormCreateProduct = () => {
  const { createProduct, isLoading } = useCreateProduct();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
  });

  const onSubmit = (values: FormCreateProduct) => {
    const payload = values;
    createProduct(payload);
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      form.setValue("thumbnail", [files[0]]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };
  const removeSelectedImage = () => {
    form.setValue("thumbnail", []);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          name="name"
          type="text"
          label="Product Name"
          placeholder="Your Product Name"
          form={form}
        />

        <FormInput
          name="price"
          type="number"
          label="Price"
          placeholder="Product Price"
          form={form}
        />

        <FormInput
          name="stock"
          type="number"
          label="Stock"
          placeholder="Product Stock"
          form={form}
        />

        {selectedImage && (
          <>
            <div className="relative h-44 w-60 border">
              <Image
                src={selectedImage}
                alt="Thumbnail"
                fill
                className="object-contain"
              />
            </div>
            <button onClick={removeSelectedImage}>Remove</button>
          </>
        )}

        <div className="flex flex-col space-y-1.5 text-sm">
          <label className="font-semibold">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            ref={thumbnailRef}
            onChange={onChangeThumbnail}
          />
        </div>

        {form.formState.errors.thumbnail && (
          <p className="text-red-600">
            {form.formState.errors.thumbnail.message}
          </p>
        )}

        <div className="flex">
          <Button type="submit" className=" ml-auto" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCreateProduct;
