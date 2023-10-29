import { useState } from "react"
import { IconButton } from "@material-ui/core"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import { Button, Drawer, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { Logout } from "../api/AuthAPI"

const SideMenu = ({ links }) => {
  const navigate = useNavigate()

  function handleButtonClick(item) {
    if (item.label === "Logout") {
      Logout()
      navigate("/")
    } else {
      navigate(item.to)
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack spacing={6} direction="column" sx={{ padding: "20%" }}>
          {links.map((item, index) => (
            <Button color="inherit" key={index}>
              <b className="text-lg" onClick={() => handleButtonClick(item)}>
                {item.label}
              </b>
            </Button>
          ))}
        </Stack>
      </Drawer>

      <IconButton color="inherit" onClick={() => setOpen(!open)}>
        <MenuRoundedIcon />
      </IconButton>
    </>
  )
}

export default SideMenu
