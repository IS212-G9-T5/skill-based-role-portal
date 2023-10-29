import CircularProgress from "@mui/material/CircularProgress"

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-100 h-100 fixed inset-0 flex items-center justify-center bg-white">
      <div className="text-center">
        <CircularProgress />
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
