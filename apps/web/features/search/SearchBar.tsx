"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const router = useRouter()

    const handleSearch = (event:React.KeyboardEvent<HTMLInputElement>) => {
        console.log("ssearjsfljdf")
        if(event.key === "Enter"){
            router.push(`/search?q=${searchText}`)
        }

        return
    }
    return (
        <div className="relative w-full max-w-sm">
            <FiSearch
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
            />
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
        </div>
    );
};

export default SearchBar;
