import { useForm, SubmitHandler } from "react-hook-form";
import { PaymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShoppingCart } from "lucide-react";
import router from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();

  const handdlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {};

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handdlePaymentForm)}>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs text-gray-500 font-medium">
          Name on Card
        </label>
        <input
          type="text"
          id="cardHolder"
          placeholder="John Doe"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-xs text-gray-500 font-medium">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="expDate" className="text-xs text-gray-500 font-medium">
          Exp Date (MM/YY)
        </label>
        <input
          type="text"
          id="expDate"
          placeholder="01/30"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          {...register("expDate")}
        />
        {errors.expDate && (
          <p className="text-xs text-red-500">{errors.expDate.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          placeholder="123"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/klarna.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
        Check Out
        <ShoppingCart className="w-5 h-5" />
      </button>
    </form>
  );
};

export default PaymentForm;
