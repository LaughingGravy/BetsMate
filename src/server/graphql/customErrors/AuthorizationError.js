import { createError } from "apollo-errors"

export const AuthorizationError = createError("AuthorizationError", {
  message: "credentials-error"
})

