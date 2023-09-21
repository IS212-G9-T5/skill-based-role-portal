import { useState } from "react"

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
