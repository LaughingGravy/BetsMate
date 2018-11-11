const isMinimumRole = (minRole, role) => {
  let isMet = false

  switch(minRole) {
    case "guest":
      if (role) 
        isMet = true;
      break;

    case "user":
      if (role === "user"  || role === "admin")
        isMet = true;
      break;

    case "admin":
      if (role === "admin")
        isMet = true;
      break;

    default:
      break;
  }

  return isMet;
}

export { isMinimumRole }