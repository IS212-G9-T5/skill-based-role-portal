/**
 * API call to retrieve all role listing (paginated)
 * import { getRoleListings } from ...
 */
export const getRoleListings = async (
  page: number,
  size: number,
  roleName?: string,
  skills?: string[]
): Promise<RoleListings> => {
  let url = `/api/listings?page=${page}&size=${size}`

  if (roleName) {
    url += `&role=${roleName}`
  }

  if (skills && skills.length > 0) {
    skills.forEach((skill) => {
      url += `&skills=${encodeURIComponent(skill)}`
    })
  }

  console.log(url)

  const response = await fetch(url, {
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
/**
 * API call to update a role listing
 * import { updateRoleListing } from ...
 */

export const updateRoleListing = async (
  data: RoleApplication,
  id
): Promise<Response> => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }
  const response = await fetch(`/api/listings/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
    },
    body: JSON.stringify(data),
  })
  return response
}

/**
 * API call to retrieve user's skills
 * import { getUserSkills } from ...
 */

export const getUserSkills = async (): Promise<SkillObject[]> => {
  const response = await fetch("/api/skills", {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch user skills")
  }
  const res = await response.json()
  return res.data
}

/**
 * API call to retrieve user's skills
 * import { updateApplyRoleListing } from ...
 */
export const updateApplyRoleListing = async (
  has_applied: boolean,
  id: string
): Promise<void> => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }
  try {
    const response = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      },
      body: JSON.stringify({
        apply: !has_applied,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to update role listing")
    }

    const res = await response.json()

    return res
  } catch (error) {
    // Handle errors here or re-throw the error for higher-level handling
    console.error("Error updating role listing:", error)
    throw error
  }
}
