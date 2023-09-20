import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import EngineeringIcon from '@mui/icons-material/Engineering';

const HRNavbar = () => {
  return (
    <AppBar position='static' sx={{ height: '100%', padding: '1%' }}>
        <Toolbar>
            <IconButton size="large" edge='start' color="inherit" >
                <EngineeringIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
            <Typography variant="h4" component='div' sx={{flexGrow: 1}} style={{fontFamily: 'Poppins, sans-serif'}}>
                SKILLS BASED ROLE PORTAL 
            </Typography>
            <Stack spacing={6} direction='row'>
            <Button color="inherit" sx={{ fontSize: '18px' }} style={{fontFamily: 'Poppins, sans-serif'}}><b>Create Listing</b></Button>
            <Button color="inherit" sx={{ fontSize: '18px' }} style={{fontFamily: 'Poppins, sans-serif'}}><b>View Requisitions</b></Button>
            <Button color="inherit" sx={{ fontSize: '18px' }} style={{fontFamily: 'Poppins, sans-serif'}}><b>Logout</b></Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default HRNavbar


