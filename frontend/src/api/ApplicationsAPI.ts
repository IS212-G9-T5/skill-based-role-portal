/**
 * API call to retrieve all roles
 * import { getAvailableListings } from ...
 */
export const getAvailableListings = async (
  page: number,
  size: number
): Promise<RoleListings> => {
  const response = await fetch(
    `api/available-listings?page=${page}&size=${size}`,
    {
      credentials: "include",
    }
  )
  if (!response.ok) {
    throw new Error("Failed to fetch roles")
  }
  const res = await response.json()
  return res
}
