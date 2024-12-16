"use client";

import { formatToCurrency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

interface ProductCardProps {
  name: string;
  stock: number;
  price: number;
  thumbnail: string;
  productId: number;
  username: string;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  productId,
  stock,
  thumbnail,
  username,
}) => {
  return (
    <Link href={`/${productId}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="relative h-44 sm:h-48 md:h-56 w-full overflow-hidden rounded-md">
            <Image
              src={thumbnail}
              alt="thumbnail"
              className="object-contain"
              fill
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-3 md:p-4">
          <Badge
            variant="outline"
            className="rounded-sm bg-green-100 text-xs md:text-sm "
          >
            <p className="text-center mx-auto">Stock: {stock}</p>
          </Badge>
          <h2 className="line-clamp-2 text-sm sm:text-base md:text-lg font-semibold">
            {name}
          </h2>
          <h2 className="line-clamp-1 text-xs sm:text-sm md:text-base text-gray-500">
            {username}
          </h2>
          <p className="line-clamp-3 text-base sm:text-lg md:text-xl font-black">
            {formatToCurrency(price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
