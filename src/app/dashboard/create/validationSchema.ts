import { z } from "zod";

const MAX_FILE_SIZE = 7 * 1024 * 1024;

export const ValidationSchema = z.object({
  name: z
    .string({
      required_error: "Product Name is required.",
    })
    .min(2, {
      message: "Product name must be at least 2 characters.",
    }),
  price: z
    .string({
      required_error: "Price is required.",
    })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Price must be a positive number.",
    }),
  stock: z
    .string({
      required_error: "Stock is required.",
    })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Stock must be a non-negative integer.",
    }),
  thumbnail: z
    .array(z.any())
    .refine((files) => files.length > 0, {
      message: "At least one file is required.",
    })
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Each file must be less than 7 MB and of type JPG or PNG.",
    }),
});
