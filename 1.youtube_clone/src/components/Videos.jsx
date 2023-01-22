
import React from "react";
import { Stack, Box, Typography } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from ".";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;

  // console.log(videos)
  
  return (
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
  );
}

export default Videos;
