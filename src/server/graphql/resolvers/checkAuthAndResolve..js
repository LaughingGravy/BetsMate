import jwt from 'jsonwebtoken'
import AuthorizationError from '../AuthorizationError'

const checkAuthAndResolve = (ctx, action) => {

  console.log("checkAuthAndResolve")

  const req = ctx.req;
  const token = ctx.heaqders.authorization

  if (!token) {
    throw new AuthorizationError()
  }

  jwt.verify(token, Config.secret, (error, data) => {
    if (error) {
      throw new AuthorizationError()
    }

    try {[]
      return action.apply(this, data)
    }
    catch(e) {
      console.log(e)
      throw e;
    }
  })
}

export { checkAuthAndResolve }