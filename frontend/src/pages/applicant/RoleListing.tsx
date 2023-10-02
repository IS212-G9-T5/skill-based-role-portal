import { Button, Chip, Grid, Typography, Modal, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const RoleListing = (props: Roles) => {
  const navigate = useNavigate()

  const commonSkills = props.skills.filter(skill => props.userSkills.some(userSkill => userSkill.name === skill));

  const matchedPercentage = (commonSkills.length / props.skills.length) * 100;

  const [open, setOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState({ name: "", description: "" });


  const handleOpen = (skillName, skillDescription) => {
    setOpen(true);
    setSelectedSkill({ name: skillName, description: skillDescription });
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedSkill({ name: "", description: "" });
  };

  const handleBackToListings = () => {
    navigate(`/all-role-listing`)
  }

  return (
    <div>
      <div>
        <div className="pl-[10%] pr-[10%] pt-[2%]">
          <strong>
            <Typography variant="h4">{props.name}</Typography>
          </strong>
          <Typography variant="subtitle1" className="mb-[2%] text-[#B0B0B4]">
            Role ID: {props.id} | Status: {props.status} | Closing Date: {props.end_date}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: "3%" }}>
            <b>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              Role Description
            </b>
          </Typography>

          <Typography variant="body1" style={{ marginBottom: "3%" }} paragraph>
            {props.description}
          </Typography>

          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <Typography variant="h6">
              <strong>
                <span className="mr-2 bg-[#1976D2] pl-2"></span>
                Skills Required [Skills Matched: {commonSkills.length}/{props.skills.length} ({matchedPercentage.toFixed(0)}%)]
              </strong>
              <br></br>
              {props.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color={commonSkills.includes(skill) ? "success" : "error"}
                  className="mr-[1%] mt-[1%]"
                  onClick={() => handleOpen(skill, "")}
                />
              ))}
            </Typography>
          </Grid>
          
          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <Typography variant="h6">
              <strong>
                <span className="mr-2 bg-[#1976D2] pl-2"></span>
                Skills that I have:
              </strong>
              <br></br>
              {props.userSkills.map((skill, index) => (
                <Chip 
                key={index} 
                label={skill.name} 
                className="mr-[1%] mt-[1%]" 
                onClick={() => handleOpen(skill.name, skill.description)}/>
              ))}
            </Typography>
          </Grid>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="skill-description-modal"
            aria-describedby="skill-description-modal"
          >
          
            {/* <Box sx={style}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                {selectedSkill.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedSkill.description}
              </Typography>
            </Box> */}
      
        </Modal>

          

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Apply Now
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={{
              marginTop: "20px",
              marginLeft: "10px",
            }}
            onClick={handleBackToListings}
          >
            Back to Listings
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RoleListing