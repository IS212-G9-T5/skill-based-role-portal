/**
 * API call to log in
 * import { getRoles } from ...
 */
export const Login = async (email: string, password: string) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    throw new Error("Failed to log in")
  }
  const res = await response.json()

  return res
}

/**
 * API call to log out
 * import { logout } from ...
 */
export const Logout = async () => {
  console.log("logout")
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to log out")
  }
  localStorage.removeItem("role")
}
