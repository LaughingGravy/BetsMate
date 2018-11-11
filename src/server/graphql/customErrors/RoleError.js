import { createError } from "apollo-errors"

export const RoleError = createError("RoleError", {
  message: "role-error"
})