import React from "react"

import { AccessControlProps } from "../types/global"

const checkPermissions = (
  userPermissions: string,
  allowedPermissions: string[]
): boolean => {
  console.log(userPermissions)
  console.log(allowedPermissions)
  if (allowedPermissions.length === 0) {
    return true
  }
  return allowedPermissions.includes(userPermissions)
}
const AccessControl: React.FC<AccessControlProps> = ({
  userPermissions,
  allowedPermissions,
  children,
  renderNoAccess,
}) => {
  const permitted = checkPermissions(userPermissions, allowedPermissions)

  if (permitted) {
    return <>{children}</>
  }
  return <>{renderNoAccess()}</>
}

export default AccessControl
