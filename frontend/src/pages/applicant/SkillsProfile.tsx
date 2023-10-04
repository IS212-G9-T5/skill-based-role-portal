import NavBar from '../../components/Navbar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from 'react'

const SkillsProfile = () => {
    const title = "SKILLS BASED ROLE PORTAL"
    const items = ["View Listings", "View Profile", "Logout"]
    
    // To obtain the skills of the user
    const [userSkills, setUserSkills] = useState<{ name: string; description: string }[]>([]);

    useEffect(() => {
    async function fetchSkills() {
        try {
        const response = await fetch('http://localhost:5000/api/skills');
        const data = await response.json();
        const skillsArray = data.data;
        setUserSkills(skillsArray);
        } catch (error) {
        console.error(error);
        }
    }
    
    fetchSkills();
    }, []);

    const [selectedChip, setSelectedChip] = useState(userSkills[0]||null);
    const [open, setOpen] = useState(false);

    const handleChipClick = (chip) => {
        if (chip !== selectedChip) {
            setSelectedChip(chip);
            setOpen(true);
        }
    }

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <NavBar title={title} items={items} />
            <div className='pl-[10%] pr-[10%] pt-[2%]'>
                <strong>
                    <Typography variant="h3">My Profile</Typography>
                </strong>
                <Typography variant="h6" gutterBottom style={{ marginTop: "3%" }}>
                    <b>
                        <span className="mr-2 bg-[#1976D2] pl-2"></span>
                        Profile Details:
                    </b>
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "3%", marginTop:"3%" }} paragraph>
                    <b>Name:</b> Sample Name <br></br>
                    <b>Email:</b> Sample Email <br></br>
                    <b>Department:</b> Sample Department <br></br>
                </Typography>

                <Grid item xs={12} style={{ marginBottom: "3%" }}>
                    <Typography variant="h6">
                    <strong>
                        <span className="mr-2 bg-[#1976D2] pl-2"></span>
                        Skills that I have:
                    </strong>
                    <br></br>
                    {userSkills.map((skill,index) => (
                        <Chip 
                        key={index} 
                        label={skill.name}
                        style={{margin:"5px"}}
                        onClick={() => handleChipClick(skill)}
                        />
                    ))}
                    </Typography>
                </Grid>

                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle id="alert-dialog-title">{selectedChip ? selectedChip.name : "No Chip Selected"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {selectedChip ? selectedChip.description : "Please select a chip"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default SkillsProfile