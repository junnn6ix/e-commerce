import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 bg-gray-100/40 px-2 py-1.5 rounded-md ">
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="b-none outline-0 text-sm focus:outline-none w-36 text-gray-500"
      />
      <Search className="w-4 h-4" />
    </div>
  );
};

export default SearchBar;
