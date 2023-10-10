/**
 * API call to retrieve all role listing (paginated)
 * import { getRoleListings } from ...
 */
export const getRoleListings = async (
  page: number,
  size: number
): Promise<RoleListings> => {
  const response = await fetch(`/api/listings?page=${page}&size=${size}`, {
    credentials: "include",
  })
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
export const getRoleListingById = async (id: string): Promise<Roles> => {
  const response = await fetch(`/api/listings/${id}`, {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch role by id")
  }
  const res = await response.json()
  return res
}

/**
 * API call to create a new role listing
 * import { createRoleListing } from ...
 */
export const createRoleListing = async (data: Roles): Promise<Roles> => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }
  const response = await fetch("/api/example", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create new role listing")
  }
  const res = await response.json()
  return res.data
}
