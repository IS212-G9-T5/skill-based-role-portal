import SearchIcon from "@mui/icons-material/Search"
import { Box } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"

const Search = ({ setSearchRoleName }) => {
  return (
    <Box>
      <div>
        <TextField
          onChange={(event) => setSearchRoleName(event.target.value)}
          label="Search by Role Name"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  )
}

export default Search
