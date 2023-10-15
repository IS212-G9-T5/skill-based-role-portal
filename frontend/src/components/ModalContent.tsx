import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const ModalContent = ({ selectedChip }) => {
  return (
    <div>
      <Box sx={style}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          {selectedChip?.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {selectedChip?.description}
        </Typography>
      </Box>
    </div>
  )
}

export default ModalContent
