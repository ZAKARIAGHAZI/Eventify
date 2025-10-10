import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Event,
  Category,
  LocationOn,
  AttachMoney,
  Clear,
} from "@mui/icons-material";

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

  const handleClearFilters = () => {
    const cleared = { date: "", category: "", location: "", price: "" };
    setFilters(cleared);
  };

  const selectStyles = {
    "& .MuiInputBase-root": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "rgb(31, 41, 55)",
      borderRadius: "8px",
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.5) !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(147, 51, 234) !important",
      borderWidth: "2px !important",
    },
    "& .MuiInputLabel-root": {
      color: "rgb(31, 41, 55) !important",
    },
    "& .MuiSvgIcon-root": {
      color: "rgb(147, 51, 234)",
    },
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start w-full">
      {/* 1. Date Filter */}
      <FormControl
        size="small"
        sx={{
          ...selectStyles,
          minWidth: { xs: "100%", sm: "130px", md: "150px" },
        }}
      >
        <InputLabel shrink={Boolean(filters.date)} sx={{ paddingLeft: 5 }}>Date</InputLabel>
        <Select
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Event color="primary" />
                </InputAdornment>
              }
              label="Date"
            />
          }
        >
          <MenuItem value="">Any Date</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="weekend">This Weekend</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
      </FormControl>

      {/* 2. Category Filter */}
      <FormControl
        size="small"
        sx={{
          ...selectStyles,
          minWidth: { xs: "100%", sm: "130px", md: "150px" },
        }}
      >
        <InputLabel shrink={Boolean(filters.category)} sx={{ paddingLeft: 5 }}>Category</InputLabel>
        <Select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Category color="primary" />
                </InputAdornment>
              }
              label="Category"
            />
          }
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="tech">Tech</MenuItem>
          <MenuItem value="music">Music</MenuItem>
          <MenuItem value="art">Art</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="community">Community</MenuItem>
        </Select>
      </FormControl>

      {/* 3. Location Filter */}
      <FormControl
        size="small"
        sx={{
          ...selectStyles,
          minWidth: { xs: "100%", sm: "130px", md: "150px" },
        }}
      >
        <InputLabel shrink={Boolean(filters.location)} sx={{ paddingLeft: 5 }}>Location</InputLabel>
        <Select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <LocationOn color="primary" />
                </InputAdornment>
              }
              label="Location"
            />
          }
        >
          <MenuItem value="">Any Location</MenuItem>
          <MenuItem value="sf">San Francisco</MenuItem>
          <MenuItem value="la">Los Angeles</MenuItem>
          <MenuItem value="ny">New York</MenuItem>
          <MenuItem value="chicago">Chicago</MenuItem>
          <MenuItem value="miami">Miami</MenuItem>
          <MenuItem value="seattle">Seattle</MenuItem>
        </Select>
      </FormControl>

      {/* 4. Price Filter */}
      <FormControl
        size="small"
        sx={{
          ...selectStyles,
          minWidth: { xs: "100%", sm: "130px", md: "150px" },
        }}
      >
        <InputLabel shrink={Boolean(filters.price) } sx={{ paddingLeft: 5 }}>Price</InputLabel>
        <Select
          value={filters.price}
          onChange={(e) => handleChange("price", e.target.value)}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoney color="primary" />
                </InputAdornment>
              }
              label="Price"
            />
          }
        >
          <MenuItem value="">Any Price</MenuItem>
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </Select>
      </FormControl>

      {/* Clear Filters Button */}
      <Button
        onClick={handleClearFilters}
        variant="text"
        size="large"
        startIcon={<Clear />}
        sx={{
          color: "white",
          textTransform: "none",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
