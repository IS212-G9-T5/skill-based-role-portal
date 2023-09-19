import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import EngineeringIcon from '@mui/icons-material/Engineering';

export const HRNavbar = () => {
  return (
    <AppBar position='static' sx={{ height: '100%', padding: '2%' }}>
        <Toolbar>
            <IconButton size="large" edge='start' color="inherit" >
                <EngineeringIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
            <Typography variant="h4" component='div' sx={{flexGrow: 1}}>
                SKILLS BASED ROLE PORTAL 
            </Typography>
            <Stack spacing={6} direction='row'>
            <Button color="inherit" sx={{ fontSize: '18px' }}>Create Listing</Button>
            <Button color="inherit" sx={{ fontSize: '18px' }}>View Requisitions </Button>
            <Button color="inherit" sx={{ fontSize: '18px' }}>Logout</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}


