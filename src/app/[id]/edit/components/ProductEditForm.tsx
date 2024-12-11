"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useEditProduct from "@/hooks/api/product/useEditProduct";
import useGetProduct from "@/hooks/api/product/useGetProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "../validationSchema";

interface FormEditProductProps {
  id: number;
}

const FormEditProduct: FC<FormEditProductProps> = ({ id }) => {
  const { product } = useGetProduct(id);

  const { editProduct, isLoading } = useEditProduct(id);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
  });

  const { setValue, handleSubmit, reset, formState } = form;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        price: product.price ? String(product.price) : "",
        stock: product.stock ? String(product.stock) : "",
        thumbnail: undefined,
      });
    }
  }, [product]);

  const [selectedImage, setSelectedImage] = useState<string>("");

  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setValue("thumbnail", [files[0]]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };
  const removeSelectedImage = () => {
    setValue("thumbnail", undefined);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((values) => {
          editProduct(values);
        })}
        className="space-y-3"
      >
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

        {formState.errors.thumbnail && (
          <p className="text-red-600">{formState.errors.thumbnail.message}</p>
        )}

        <div className="flex">
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEditProduct;
