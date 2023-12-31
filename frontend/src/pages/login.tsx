import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Login } from "../api/AuthAPI"
import LoginModal from "../components/LoginModal"

const LoginForm = () => {
  const [staffId, setStaffId] = useState("")
  const [password, setPassword] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const res = await Login(+staffId, password)
      if (res.status == "success") {
        const role = res.role
        localStorage.setItem("role", role)
        if (["Admin", "HR", "Manager"].includes(role)) {
          navigate("/view-applications")
        } else {
          navigate("/all-role-listing")
        }
        window.location.reload()
      } else {
        setModalOpen(true)
      }
    } catch (error) {
      console.error("Error during login:", error)
      setModalOpen(true)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <LoginModal open={modalOpen} handleClose={() => setModalOpen(false)} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Staff id
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setStaffId(e.target.value)}
                  id="staffId"
                  name="staffId"
                  type="staffId"
                  autoComplete="staffId"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1976d2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
