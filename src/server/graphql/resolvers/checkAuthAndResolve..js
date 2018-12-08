import AuthorizationError from '../customErrors/AuthorizationError'

const checkAuthAndResolve = (ctx, action, params) => {
  const req = ctx.req;
  const user = req.headers.authorization

  if (!user || user.role == "guest") {
    throw new Error("Unauthorised Access")
  }

  try {
    return action(params)
  }
  catch(e) {
    console.log(e)
    throw e;
  }
}

export { checkAuthAndResolve }