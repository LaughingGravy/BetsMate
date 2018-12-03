import jwt from 'jsonwebtoken'
import AuthorizationError from '../customErrors/AuthorizationError'

const checkAuthAndResolve = (ctx, action) => {

  console.log("checkAuthAndResolve")

  const req = ctx.req;
  const token = req.headers.authorization

  console.log("req.user", req.user)
  console.log("req.headers.authorization", req.headers.authorization)

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