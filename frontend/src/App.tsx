import { useRoutes } from "react-router-dom";
import routes from "./routes"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  const content = useRoutes(routes)
  return content
}

export default App
