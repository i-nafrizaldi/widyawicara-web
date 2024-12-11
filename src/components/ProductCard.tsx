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
      <Card>
        <CardHeader>
          <div className=" relative h-[200px] w-full overflow-hidden rounded-md">
            <Image
              src={thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="rounded-sm bg-green-100">
            Stock:{stock}
          </Badge>
          <h2 className="line-clamp-2 text-lg">{name}</h2>
          <h2 className="line-clamp-1 text-sm">{username}</h2>
          <p className="line-clamp-3 text-xl font-black">
            {formatToCurrency(price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
