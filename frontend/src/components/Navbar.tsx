import EngineeringIcon from "@mui/icons-material/Engineering"
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

import { Logout } from "../api/AuthAPI"
import DrawerComp from "./DrawerComp"

const Navbar = (props: NavBar) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate()

  function handleButtonClick(item) {
    if (item.label === "Logout") {
      Logout()
      navigate("/")
    } else {
      navigate(item.to)
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <EngineeringIcon />
        </IconButton>
        <Typography variant="h5" component="div" className="flex flex-grow">
          <b className="text-2xl"> {props.title} </b>
        </Typography>

        {isMatch ? <><DrawerComp links={props.items}/></> :
        
        <Stack spacing={6} direction="row">
          {props.items.map((item, index) => (
            <Button color="inherit" key={index}>
              <b className="text-lg" onClick={() => handleButtonClick(item)}>
                {item.label}
              </b>
            </Button>
          ))}
        </Stack>}

        
        
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
