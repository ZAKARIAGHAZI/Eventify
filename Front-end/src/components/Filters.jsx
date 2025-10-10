import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    location: "",
    price: "",
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <FormControl size="small" className="min-w-[120px] bg-white rounded-xl">
        <InputLabel>Date</InputLabel>
        <Select
          value={filters.date}
          label="Date"
          onChange={(e) => handleChange("date", e.target.value)}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="weekend">This Weekend</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" className="min-w-[120px] bg-white rounded-xl">
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          label="Category"
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="tech">Tech</MenuItem>
          <MenuItem value="music">Music</MenuItem>
          <MenuItem value="art">Art</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="community">Community</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" className="min-w-[120px] bg-white rounded-xl">
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.location}
          label="Location"
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="sf">San Francisco</MenuItem>
          <MenuItem value="la">Los Angeles</MenuItem>
          <MenuItem value="ny">New York</MenuItem>
          <MenuItem value="chicago">Chicago</MenuItem>
          <MenuItem value="miami">Miami</MenuItem>
          <MenuItem value="seattle">Seattle</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" className="min-w-[120px] bg-white rounded-xl">
        <InputLabel>Price</InputLabel>
        <Select
          value={filters.price}
          label="Price"
          onChange={(e) => handleChange("price", e.target.value)}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </Select>
      </FormControl>

      <button
        onClick={() =>
          setFilters({ date: "", category: "", location: "", price: "" })
        }
        className="text-blue-500 hover:underline ml-2 text-sm"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default Filters;
