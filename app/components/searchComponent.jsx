"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchComponent = ({ query = "" }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(query);

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleInput = (e) => setSearchText(e.target.value);

  return (
    <div className="flex w-full max-w-3xl mx-auto p-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search GitHub User"
          value={searchText}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 pr-4 px-3 py-2 flex h-10 w-full rounded-md border border-input bg-backgroundtext-sm"
        />
      </div>
      <button
        type="button"
        className="ml-2 px-5 py-2.5 text-sm font-medium rounded-lg text-center text-white bg-[#BE5B50] hover:bg-[#8A2D3B] cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
