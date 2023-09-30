import { Button, Chip, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const RoleListing = (props: Roles) => {
  const navigate = useNavigate()

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
                Skills Required
              </strong>
              <br></br>
              {props.skills.map((skill, index) => (
                <Chip key={index} label={skill} className="mr-[1%] mt-[1%]" />
              ))}
            </Typography>
          </Grid>

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
