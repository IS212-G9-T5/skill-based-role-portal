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


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


  const [openApply, setOpenApply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);


  const handleApplyOpen = () => {
    setOpenApply(true);
  };

  const handleApplyClose = () => {
    setOpenApply(false);
  };

  const handleWithdrawOpen = () => {
    setOpenWithdraw(true);
  };

  const handleWithdrawClose = () => {
    setOpenWithdraw(false);
  };

  const handleApplySubmit = () => {
    // Handle the submission logic for applying here
    // This function should be replaced with your actual submission logic
    console.log('Application submitted');
    setOpenApply(false);
  };

  const handleWithdrawSubmit = () => {
    // Handle the submission logic for withdrawing here
    // This function should be replaced with your actual withdrawal logic
    console.log('Application withdrawn');
    setOpenWithdraw(false);
  };


  const data = {
    "listing": {
        "end_date": "2023-10-11",
        "id": 31,
        "role": {
            "description": "lorem ipsum",
            "name": "Consultant",
            "skills": [
                "Collaboration",
                "Communication",
                "Learning Agility"
            ]
        },
        "start_date": "2023-09-11",
        "status": "OPEN"
    },
    "skills_match_count": 2,
    "skills_match_pct": 0.67,
    "skills_matched": [
        "Communication",
        "Collaboration"
    ],
    "skills_unmatched": [
        "Learning Agility"
    ],
    "has_applied": false
}
  
  const has_applied = data.has_applied;

  // useEffect(() => {
  //   const currUrl = window.location.href
  //   const id = currUrl.split("/").pop()
  //   const endpointUrl = `http://127.0.0.1:5000/api/listings/${id}`
  //   fetch(endpointUrl)
  //   .then((response) => response.json())   
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  // }, [])




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


          {
            has_applied ? (
              <Button
                variant="contained"
                color="secondary"  // You can use 'secondary' for a red color
                style={{ marginTop: "20px" }}
                onClick={handleWithdrawOpen}
                // onClick={() => }
              >
                Withdraw Application
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleApplyOpen}
              >
                Apply Now
              </Button>
            )
          }


      <Modal
        open={openApply}
        onClose={handleApplyClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Click on the Submit button if you confirm your application
            </Typography>
            <Button variant="contained" color="primary" onClick={handleApplySubmit}>
              Submit
            </Button>
          </Box>
        </div>
      </Modal>


      <Modal
        open={openWithdraw}
        onClose={handleWithdrawClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Withdraw Application
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to withdraw your application?
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleWithdrawSubmit}>
              Withdraw
            </Button>
          </Box>
        </div>
      </Modal>



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
