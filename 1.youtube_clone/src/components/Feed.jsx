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

    // flexDirection: { xs: "column", md: "row" } -> flexDirection is row only for below md
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>

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
