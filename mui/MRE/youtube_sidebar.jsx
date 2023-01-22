
/*======================================================
Feed page
    - Shows Sidebar
    - Videos
======================================================*/

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (

    // flexDirection: { sx: "column", md: "row" } -> flexDirection is row only for below md
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

      {/* sidebar div */}
      {/* height will take full height on bigger than medium device */}
      <Box 
        sx={{ height: { sx: "auto", md: "92vh" }, 
        borderRight: "2px solid #3d3d3d", 
        px: { sx: 0, md: 2 } }}>
          <Sidebar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
              Copyright © 2022 JSM Media
          </Typography>
      </Box>

      {/* video card component */}
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        {/* typrography is for styling text */}
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
            {selectedCategory} 
            <span style={{ color: "#FC1503" }}> videos</span>
        </Typography>

        <Videos 
          videos={videos} 
        />
      </Box>
    </Stack>
  );
};

export default Feed;

/*======================================================
Side-Bar Page
======================================================*/

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

