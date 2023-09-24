import { useState } from "react"

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import RolelistingForm from "./pages/hr/signup"

import "./App.css"

function App({children}) {
  const [count, setCount] = useState(0)

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        <div className="App">
        <RolelistingForm />
      </div>
    </LocalizationProvider>
    </>
  )
}

export default App
