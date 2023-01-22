import { display, positions, Stack } from "@mui/system"
import { Link } from "react-router-dom"
import { logo } from "../utils/constants"
import SearchBar from "./SearchBar"


function Navbar() {
  return (
    <Stack
      p={2}
      direction="row"
      alignItems="center"
      sx={{ position:'sticky', background:'#000', top:0, justifyContent:'space-between' } }
    >
      <Link to="/" style={{display:'flex', alignItems:'center'}} >
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
    </Stack>
  )
}

export default Navbar