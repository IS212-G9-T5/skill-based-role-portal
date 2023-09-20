import EngineeringIcon from "@mui/icons-material/Engineering"
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"

const StaffNavbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ height: "100%", padding: "1%", width: "100%" }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <EngineeringIcon sx={{ fontSize: "50px" }} />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <b>SKILLS BASED ROLE PORTAL </b>
        </Typography>
        <Stack spacing={6} direction="row">
          <Button
            color="inherit"
            sx={{ fontSize: "18px" }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <b>View Listings</b>
          </Button>
          <Button
            color="inherit"
            sx={{ fontSize: "18px" }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <b>View Profile</b>
          </Button>
          <Button
            color="inherit"
            sx={{ fontSize: "18px" }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <b>Logout</b>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default StaffNavbar
