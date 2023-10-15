import { useState } from "react"
import { Button, Chip, Grid, Typography } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useNavigate } from "react-router-dom"

const RoleListing = (props: Roles) => {
  const navigate = useNavigate()

  const [selectedChip, setSelectedChip] = useState(props.userSkills[0] || null)
  const [open, setOpen] = useState(false)

  const handleChipClick = (chip) => {
    // See if chip is in props.roleMatchData.skills_matched or props.roleMatchData.skills_unmatched
    // If so, set selectedChip to chip and open modal
    // Else, do nothing
    const matchedSkill = props.roleMatchData.skills_matched.find(
      (s) => s.name === chip
    )
    const unmatchedSkill = props.roleMatchData.skills_unmatched.find(
      (s) => s.name === chip
    )

    if (matchedSkill) {
      setSelectedChip(matchedSkill)
      setOpen(true)
    } else if (unmatchedSkill) {
      setSelectedChip(unmatchedSkill)
      setOpen(true)
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleBackToListings = () => {
    navigate(`/all-role-listing`)
  }
  const handleEditListing = () => {
    navigate(`/update-role-listing/${props.id}`)
  }

  return (
    <div>
      <div>
        <div className="pl-[10%] pr-[10%] pt-[2%]">
          <strong>
            <Typography variant="h4">{props.name}</Typography>
          </strong>
          <Typography variant="subtitle1" className="mb-[2%] text-[#B0B0B4]">
            Role ID: {props.id} | Status: {props.status} | Closing Date:{" "}
            {props.end_date}
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
                Skills Required [Matched Skills:{" "}
                {props.roleMatchData.skills_match_count}/
                {props.roleMatchData.skills_matched.length +
                  props.roleMatchData.skills_unmatched.length}{" "}
                ({props.roleMatchData.skills_match_pct * 100}%)]
              </strong>
              <br></br>
              {props.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  style={{ margin: "5px" }}
                  className={`mr-[1%] mt-[1%] ${
                    props.roleMatchData.skills_matched.find(
                      (matchedSkill) => matchedSkill.name === skill
                    )
                      ? "bg-[#49d861] font-bold"
                      : props.roleMatchData.skills_unmatched.find(
                          (unmatchedSkill) => unmatchedSkill.name === skill
                        )
                      ? "bg-[#cff8db] opacity-50"
                      : ""
                  }`}
                  onClick={() => handleChipClick(skill)}
                />
              ))}
            </Typography>
          </Grid>

          <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle id="alert-dialog-title">
              {selectedChip ? selectedChip.name : "No Chip Selected"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {selectedChip
                  ? selectedChip.description
                  : "Please select a chip"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </Dialog>

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
          <Button
            variant="contained"
            color="primary"
            style={{
            marginTop: "20px",
            marginLeft: "10px",
            }}
            onClick={handleEditListing}>
            Edit Role Listing
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RoleListing
