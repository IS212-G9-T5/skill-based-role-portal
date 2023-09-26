import { Button, Chip, Grid, Typography } from "@mui/material"

interface RoleListingProps {
  id: string
  roleName: string
  roleDescription: string
  start_date: string
  end_date: string
  status: boolean
  skillsRequired: string[]
}

const RoleListing = (props: RoleListingProps) => {
  return (
    <div>
      <div className="pl-[10%] pr-[10%] pt-[2%]">
        <Typography variant="h2">{props.roleName}</Typography>
        <Typography variant="h6" className="mb-[2%] text-[#B0B0B4]">
          Role ID: {props.id} | Role Listing Status: {props.status} | Start Date: {props.start_date} | End Date: {props.end_date}
        </Typography>

        {/* <Typography variant="h5" gutterBottom style={{ marginTop: "3%" }}>
          <b>
            <span className="mr-2 bg-[#1976D2] pl-2"></span>
            Role Description
          </b>
        </Typography> */}

        <Typography variant="body1" style={{ marginBottom: "3%" }} paragraph>
          {props.roleDescription}
        </Typography>

        <Grid item xs={12} style={{ marginBottom: "3%" }}>
          <Typography variant="h5" gutterBottom style={{ marginTop: "3%" }}>
            <b>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              Role Description
            </b>
          </Typography>

          <Typography variant="body1" style={{ marginBottom: "3%" }} paragraph>
            {props.roleDescription}
          </Typography>

          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <Typography variant="h5">
              <strong>
                <span className="mr-2 bg-[#1976D2] pl-2"></span>
                Skills Required
              </strong>
              <br></br>
              {props.skillsRequired.map((skill, index) => (
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
          >
            Back to Listings
          </Button>
        </Grid> 
      </div>
    </div>
  )
}

export default RoleListing
