import jwt from 'jsonwebtoken'
import AuthorizationError from '../AuthorizationError'

const checkRoleAndResolve = (ctx, minimumRole, action, ...params) => {
  const req = ctx.req;
  const token = ctx.heaqders.authorization

  if (!token) {
    throw new AuthorizationError()
  }

  jwt.verify(token, Config.secret, (error, data) => {
    if (error) {
      throw new AuthorizationError()
    }

    const role = data.role

    if (!isMinimumRole(minimumRole, role)) {
      throw new RoleError()
    } 

    return action.apply(this, params)
  })
}

export { checkRoleAndResolve }