import React from "react"
import { Button, Chip, Grid, Typography } from "@mui/material"

import StaffNavbar from "../../components/StaffNavbar"

const ViewRoleListing = () => {
  // Sample role data
  const roleData = {
    roleID: "R0001",
    roleName: "Frontend Developer",
    roleDescription:
      "As a Frontend Developer at All-In-One, you will play a pivotal role in creating and maintaining the user interfaces of our web applications. You will collaborate with cross-functional teams, including designers and backend developers, to bring our product visions to life. You will have the opportunity to work on exciting projects, from building new features to optimizing existing codebases. You will also be able to learn from and share your knowledge with your teammates, as well as grow your skillset through our mentorship program. If you are passionate about frontend development and want to make a difference, we want you to join us!",
    roleStartTime: "2023-09-25 09:00 AM",
    roleEndTime: "2023-09-30 05:00 PM",
    isOpen: true,
    skillsRequired: ["React", "JavaScript", "HTML", "CSS"],
  }

  return (
    <>
      <RoleListing
        roleID={roleData.roleID}
        roleName={roleData.roleName}
        roleDescription={roleData.roleDescription}
        isOpen={roleData.isOpen}
        skillsRequired={roleData.skillsRequired}
      />
    </>
  )
}

interface RoleListingProps {
  roleID: string
  roleName: string
  roleDescription: string
  isOpen: boolean
  skillsRequired: string[]
}

const RoleListing: React.FC<RoleListingProps> = ({
  roleID,
  roleName,
  roleDescription,
  isOpen,
  skillsRequired,
}) => {
  const fontPoppins = {
    fontFamily: "Poppins, sans-serif",
  }
  return (
    <>
      <StaffNavbar />
      <div
        style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2%" }}
      >
        <Typography variant="h2" style={fontPoppins}>
          {roleName}
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "Poppins, sans-serif",
            marginBottom: "2%",
            color: "#B0B0B4",
          }}
        >
          Role ID: {roleID} | Role Listing Status: {isOpen ? "Open" : "Closed"}
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          style={{ fontFamily: "Poppins, sans-serif", marginTop: "3%" }}
        >
          <b>
            <span
              style={{
                backgroundColor: "#1976d2",
                paddingLeft: "9px",
                marginRight: "5px",
              }}
            ></span>
            Role Description
          </b>
        </Typography>

        <Typography
          variant="body1"
          style={{ fontFamily: "Poppins, sans-serif", marginBottom: "3%" }}
          paragraph
        >
          {roleDescription}
        </Typography>

        <Grid item xs={12} style={{ marginBottom: "3%" }}>
          <Typography
            variant="h5"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>
              <span
                style={{
                  backgroundColor: "#1976d2",
                  paddingLeft: "9px",
                  marginRight: "5px",
                }}
              ></span>
              Skills Required
            </strong>
            <br></br>
            {skillsRequired.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                style={{
                  marginTop: "1%",
                  marginRight: "1%",
                  fontFamily: "Poppins, sans-serif",
                }}
              />
            ))}
          </Typography>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", fontFamily: "Poppins, sans-serif" }}
        >
          Apply Now
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Back to Listings
        </Button>
      </div>
    </>
  )
}

export default ViewRoleListing
