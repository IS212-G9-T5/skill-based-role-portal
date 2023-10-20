import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { getMatchingSkillsRoleListings, getUserProfile, getUserSkills } from "../../api/RoleListingAPI"
import NavBar from "../../components/Navbar"
import MatchingRole from "../../components/MatchingRole"

const SkillsProfile = () => {
  // To obtain the skills of the user
  const [userSkills, setUserSkills] = useState<
    { name: string; description: string }[]
  >([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getUserSkills()
        setUserSkills(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSkills()
  }, [])

  const [selectedChip, setSelectedChip] = useState(userSkills[0] || null)
  const [open, setOpen] = useState(false)

  const handleChipClick = (chip) => {
    if (chip !== selectedChip) {
      setSelectedChip(chip)
      setOpen(true)
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const navbarProps = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Listings", to: "/all-role-listing" },
      { label: "View Profile", to: "/profile" },
      { label: "Logout", to: "/" },
    ],
  }

  // To handle fetching the top x most relevant role listings and display them in a paginated manner 

  const [data , setData] = useState([]);
  const [matchLimit, setMatchLimit] = useState<number>(5);


  const fetchData = async (limit) => {
    const res = await getMatchingSkillsRoleListings(limit);
    if (res) {
      console.log(res);
      setData(res);
    }
  };

  useEffect(() => {
    fetchData(matchLimit);
  }, [matchLimit]);

  // Have the next line accept make profileDetails into type of UserProfile
  const [profileDetails, setProfileDetails] = useState<UserProfile>(null);

  const fetchProfile = async () => {
    const response = await getUserProfile();
    if (response) {
      setProfileDetails(response);
  }
}

  useEffect(() => {
    fetchProfile();
  }, []);




  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="pl-[10%] pr-[10%] pt-[2%]">
        <strong>
          <Typography variant="h3" className="pb-[3%]">
            My Skills Profile
            </Typography>
        </strong>
  
        <Grid item xs={12} style={{ marginBottom: "3%" }}>
          <Typography variant="h6">
            <strong>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              My Details: 
            </strong>
            <br></br>
            <Typography variant="body1">
              <b>First Name: </b> {profileDetails.fname} <br></br>
              <b>Last Name: </b> {profileDetails.lname} <br></br>
              <b>Email: </b> {profileDetails.email} <br></br>
              <b>Department: </b> {profileDetails.dept} <br></br>
              <b>Country: </b> {profileDetails.country} <br></br>
            </Typography>
          </Typography>
        </Grid>
        
        <Grid item xs={12} style={{ marginBottom: "3%" }}>
          <Typography variant="h6">
            <strong>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              Skills that I have:
            </strong>
            <br></br>
            {userSkills.length === 0 ? (
              <Typography variant="body1">
                You do not have any skills at the moment.
              </Typography>
            ) : (
              userSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill.name}
                  style={{ margin: "5px" }}
                  onClick={() => handleChipClick(skill)}
                />
              ))
            )}
          </Typography>
        </Grid>

        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle id="alert-dialog-title">
            {selectedChip ? selectedChip.name : "No Chip Selected"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {selectedChip ? selectedChip.description : "Please select a chip"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
        
        <Grid item xs={12} style={{ marginBottom: "3%" }}>
          <Typography variant="h6">
            <strong>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              Most Relevant Role Listings For Me:
            </strong>
            <br></br>
            <span>Number of listings to be displayed:</span>
            <Select
              value={matchLimit}
              onChange={(e) => {
                const newMatchLimit = Number(e.target.value);
                setMatchLimit(newMatchLimit);
                // fetchData(newMatchLimit);
              }}
              sx={{
                width: 100,
                height: 30,
                backgroundColor: "#f5f5f5",
                borderRadius: 4,
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Typography>
        </Grid>
                
        
        {
        // Render the matchingRoleListings
        data.map((item) => (
            <Link key={item.listing.id} to={`/role-listing/${item.listing.id}`}>
              <MatchingRole
                key={item.listing.id}
                id={item.listing.id}
                name={item.listing.role.name}
                description={item.listing.role.description}
                start_date={item.listing.start_date}
                end_date={item.listing.end_date}
                status={item.listing.status}
                skills={item.listing.role.skills}
                skills_matched={item.skills_matched}
                skills_unmatched={item.skills_unmatched}
                skills_match_count={item.skills_match_count}
                skills_match_pct={item.skills_match_pct}
              />
            </Link>
          ))
        }

      </div>
    </div>
  )
}

export default SkillsProfile