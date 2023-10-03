import { Button, Chip, Grid, Typography, Modal} from "@mui/material"
import { useNavigate } from "react-router-dom"
import ModalContent from "../../components/ModalContent";
import { useState } from "react";

const RoleListing = (props: Roles) => {
  
  const navigate = useNavigate()



  const [selectedChip, setSelectedChip] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
                Skills Required [Matched Skills: {props.roleMatchData.skills_match_count} ({props.roleMatchData.skills_match_pct}%)]
              </strong>
              <br></br>
              {props.skills.map((skill, index) => (
                <Chip
                key={index}
                label={skill}
                className={`mr-[1%] mt-[1%] ${
                  props.roleMatchData.skills_matched.includes(skill)
                    ? "emphasis"
                    : "unmatched"
                }`}
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
                onClick={() => handleChipClick(skill)}
                />
              ))}
            </Typography>
          </Grid>

          <Modal open={open} onClose={handleCloseModal} >
            {/* <ModalContent selectedChip={selectedChip} /> */}
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