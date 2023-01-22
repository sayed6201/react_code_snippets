
import { BrowserRouter, Routes, Route } from "react-router-dom";

//box is a div element..
import { Box } from '@mui/material';


//importing all the components from component folder with index.js
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';



const App = () => (
  <BrowserRouter>

  {/* the route ui will gets pushed into this Box */}
    <Box sx={{ backgroundColor: '#000' }}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
