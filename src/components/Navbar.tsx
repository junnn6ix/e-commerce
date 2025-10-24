import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-2 pb-4">
      {/* left */}
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-8 md:h-8"
        />
        <p className="hidden md:block text-md font-bold tracking-wider">
          TRENDLAMA.
        </p>
      </Link>
      {/* right */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"} className="">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <ShoppingCart className="w-4 h-4 text-gray-600" />
        <Link href={"/Login"} className="font-bold text-sm tracking-wider">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
