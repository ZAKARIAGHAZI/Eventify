import React from "react";
import { Search } from "@mui/icons-material"; // Import the Search icon from MUI

const SearchBar = ({ value, onChange, placeholder, className }) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Search Icon Container: Added the Search component */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="text-gray-400" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholder || "Search events by name, location, or keyword..."
          }
          className={`w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${className}`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
