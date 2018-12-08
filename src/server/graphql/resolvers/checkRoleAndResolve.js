
const checkRoleAndResolve = (ctx, action, params, claims) => {
  const req = ctx.req;
  const user = req.headers.authorization

  if (!user || !claims.includes(user.role)) {
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

export { checkRoleAndResolve }