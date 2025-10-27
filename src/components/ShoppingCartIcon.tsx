"use client";

import useCartStore from "@/store/CartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/dist/client/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();
  if (!hasHydrated) return null;
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-amber-300 text-gray-600 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold p-1">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
