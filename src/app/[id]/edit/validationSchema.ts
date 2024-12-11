import { z } from "zod";

const MAX_FILE_SIZE = 7 * 1024 * 1024;

export const ValidationSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 2, {
      message: "Product name must be at least 2 characters.",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0), {
      message: "Price must be a positive number.",
    }),
  stock: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 0), {
      message: "Stock must be a non-negative integer.",
    }),
  thumbnail: z
    .array(z.any())
    .optional()
    .refine(
      (files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "Each file must be less than 7 MB and of type JPG or PNG.",
      }
    ),
});
