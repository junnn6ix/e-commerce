"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItemsType, ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import useCartStore from "@/store/CartStore";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

// TMP
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "gray",
//   },
// ];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center justify-center flex-col mt-12 gap-8">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-3 border-b-2 pb-3
              ${activeStep === step.id ? "border-gray-800" : "border-gray-400"}
              `}
            key={step.id}>
            <div
              className={`flex items-center justify-center w-6 h-6 p-4 text-white rounded-full
                ${activeStep === step.id ? "bg-gray-800" : "bg-gray-400"}
              `}>
              {step.id}
            </div>
            <p
              className={`text-sm tracking-wide font-medium ${
                activeStep === step.id
                  ? "font-bold text-black"
                  : "text-gray-400"
              }`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-sm p-8 border-1 border-gray-100 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              //
              <div
                className="flex justify-between items-center"
                key={item.id + item.selectedColor + item.selectedSize}>
                {/* img and details */}
                <div className="flex gap-8 ">
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/*  */}
                  <div className="flex flex-col justify-between text-gray-500">
                    <div className="text-sm flex flex-col gap-1">
                      <p className="font-semibold text-black">{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.selectedSize}</p>
                      <p>Color: {item.selectedColor}</p>
                    </div>
                    <p className="font-bold text-black">
                      $ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                {/* delete btn */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 cursor-pointer">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill the form to continue...
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-sm p-8 border-1 border-gray-100 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-bold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-gray-800 font-bold tracking-wider">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-500">Discoount (10%)</p>
              <p className="text-gray-800 font-bold tracking-wider">$ 10</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="text-gray-800 font-bold tracking-wider">$ 10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between ">
              <p className="text-gray-500">Total</p>
              <p className="text-gray-800 font-bold tracking-wider">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartPage;
