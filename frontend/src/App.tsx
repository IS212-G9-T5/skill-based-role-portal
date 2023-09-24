import { useRoutes } from "react-router-dom";
import routes from "./routes"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


const App = ({children}) =>
  {
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    const content = useRoutes(routes)
    return content
    </LocalizationProvider>
  }

export default App
