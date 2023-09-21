import { useRoutes } from "react-router-dom";
import routes from "./routes"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import RolelistingForm from "./pages/hr/signup"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <RolelistingForm />
      </div>
    </>
  )
}

export default App
