/**
 * API call to retrieve all role listing (paginated)
 * import { getRoleListings } from ...
 */
export const getRoleListings = async (
  page: number,
  size: number
): Promise<Roles[]> => {
  const response = await fetch(`/api/listings?page=${page}&size=${size}`)
  if (!response.ok) {
    throw new Error("Failed to fetch roles")
  }
  const res = await response.json()
  return res
}

/**
 * API call to retrieve role listing by id
 * import { getRoleListingById } from ...
 */
export const getRoleListingById = async (id: number): Promise<Roles> => {
  const response = await fetch(`/api/listings/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch role by id")
  }
  const res = await response.json()
  return res.data
}

/**
 * API call to create a new role listing
 * import { createRoleListing } from ...
 */
export const createRoleListing = async (data: Roles): Promise<Roles> => {
  const response = await fetch("/api/listings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create new role listing")
  }
  const res = await response.json()
  return res.data
}