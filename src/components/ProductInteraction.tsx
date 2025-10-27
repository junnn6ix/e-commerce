"use client";

import useCartStore from "@/store/CartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Secular_One } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  //handle
  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* size */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] rounded-md ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}>
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-sm text-center ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}>
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* color */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] rounded-md ${
                selectedColor === color ? "border-gray-300" : "border-white"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}>
              <div
                className={`w-6 h-6 rounded-sm `}
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* qty */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 rounded-md"
            onClick={() => handleQuantityChange("decrement")}>
            <Minus className="w-5 h-5" />
          </button>
          <span className="">{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 rounded-md"
            onClick={() => handleQuantityChange("increment")}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* buttons */}
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-4 bg-gray-900 text-white py-2 rounded-md shadow-md cursor-pointer text-sm font-bold">
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="flex items-center justify-center gap-4 ring-1 ring-gray-400 text-gray-800 py-2 rounded-md shadow-md cursor-pointer text-sm font-bold">
        <ShoppingCart className="w-4 h-4" />
        Buy Now
      </button>
    </div>
  );
};
export default ProductInteraction;
