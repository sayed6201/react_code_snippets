import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";
import axios from "axios";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    //flex direction is row, but it will be column as defined in SX
    direction="row"
    sx={{
    // hides the overflow of icon in y axis & make it scrollable
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category) => (
      <button
      //from index.css
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
        }}
        key={category.name}
      >
            <span 
                style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}
            >
            {category.icon}
            </span>
            <span 
                style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}
            >
            {category.name}
            </span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;
