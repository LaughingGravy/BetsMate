
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
    console.log("Error checkAuthAndResolve", e)
    throw e;
  }
}

const checkAuthAndResolveAsync = async (ctx, action, params) => {
  const req = ctx.req;
  const user = req.headers.authorization

  if (!user || user.role == "guest") {
    throw new Error("Unauthorised Access")
  }

  try {
    return await action(params)
  }
  catch(e) {
    console.log("Error checkAuthAndResolveAsync", e)
    throw e;
  }
}

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
    console.log("Error checkRoleAndResolve", e)
    throw e;
  }
}

const checkRoleAndResolveAsync = async (ctx, action, params, claims) => {
  const req = ctx.req;
  const user = req.headers.authorization

  if (!user || !claims.includes(user.role)) {
    throw new Error("Unauthorised Access")
  }

  try {
    return await action(params)
  }
  catch(e) {
    console.log("Error checkRoleAndResolveAsync", e)
    throw e;
  }
}

export { checkAuthAndResolve, checkAuthAndResolveAsync, checkRoleAndResolve, checkRoleAndResolveAsync }