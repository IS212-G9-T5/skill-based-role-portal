import EngineeringIcon from "@mui/icons-material/Engineering"
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"

interface NavBar {
  title: string
  items: string[]
}

const StaffNavbar = (props: NavBar) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <EngineeringIcon />
        </IconButton>
        <Typography variant="h5" component="div" className="flex flex-grow">
          <b className="text-2xl"> {props.title} </b>
        </Typography>
        <Stack spacing={6} direction="row">
          <Button color="inherit">
            <b className="text-lg">{props.items[0]}</b>
          </Button>
          <Button color="inherit">
            <b className="text-lg">{props.items[1]}</b>
          </Button>
          <Button color="inherit">
            <b className="text-lg">{props.items[2]}</b>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default StaffNavbar
