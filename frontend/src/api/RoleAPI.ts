/**
 * API call to retrieve all roles
 * import { getRoles } from ...
 */
export const getRoles = async () => {
  const response = await fetch("/api/roles")
  if (!response.ok) {
    throw new Error("Failed to fetch roles")
  }
  const res = await response.json()
  return res.data
}

/**
 * API call to retrieve role by name
 * import { getRoleByName } from ...
 */

export const getRoleByName = async (name: string) => {
  const response = await fetch(`/api/roles/${name}`)
  if (!response.ok) {
    throw new Error("Failed to fetch role by name")
  }
  const res = await response.json()
  return res.data
}
