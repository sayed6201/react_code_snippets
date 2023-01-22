// ========================================================
// Example-Youtube sideBar-videos content :
// diplay sidebar on bigger device and hide on smaller one
// ========================================================

return (

    // flexDirection: { sx: "column", md: "row" } -> flexDirection is row for medium & higher
    // row -> next to other
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

// ==========================================================================
// youtube like video card with adjusted column number as size changes
// https://mui.com/system/flexbox/
// ==========================================================================
<Stack 
    direction={direction || "row"} 
    // auto distributes number of coulmn to be shown
    flexWrap="wrap" 
    justifyContent="start" 
    alignItems="start" 
    gap={2}
    >
        {videos.map((item, idx) => (
            <Box key={idx}>
                {/* if the api has video then show video */}
                {item.id.videoId && <VideoCard video={item} /> }

                {/* if the api has channelId then show ChannelCard*/}
                {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
        ))}
</Stack>