import NavBar from "../../components/Navbar"
import RoleListing from "./RoleListing"

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

  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]

  return (
    <div>
      <NavBar title={title} items={items} />
      <RoleListing
        roleID={roleData.roleID}
        roleName={roleData.roleName}
        roleDescription={roleData.roleDescription}
        isOpen={roleData.isOpen}
        skillsRequired={roleData.skillsRequired}
      />
    </div>
  )
}

export default ViewRoleListing
