import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 flex flex-row md:flex-row items-start md:items-start bg-gray-800 rounded-lg p-8 text-white justify-between gap-6 flex-wrap">
      <div className="flex flex-col items-start gap-3">
        <Link
          href={"/"}
          className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
          <p className="block text-md font-bold tracking-wider">TRENDLAMA.</p>
        </Link>
        <p className="text-sm text-gray-400">&copy; 2025 TRENDLAMA.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-start">
        <p className="text-md font-bold text-amber-50 tracking-wider">Links</p>
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-start">
        <p className="text-md font-bold text-amber-50 tracking-wider">Links</p>
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrivals</Link>
        <Link href={"/"}>Best Sellers</Link>
        <Link href={"/"}>Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-start">
        <p className="text-md font-bold text-amber-50 tracking-wider">Links</p>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Blog</Link>
        <Link href={"/"}>Affiliate Program</Link>
      </div>
    </footer>
  );
};
export default Footer;
