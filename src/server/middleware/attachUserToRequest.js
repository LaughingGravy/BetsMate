import jwt from 'jsonwebtoken'
import Config from '../../../utilities/Config'

const attachUserToRequest = (req, res, next) => {
  if (req.signedCookies[Config.jwt.cookieName]) {

    let token = req.signedCookies[Config.jwt.cookieName]

    if (token) {
      jwt.verify(token, Config.jwt.secret, (error, decodedToken) => {
        if (error) {
          console.log("attachUserToRequest error", error)
          res.clearCookie("betsmate")
          next();
        }

        if (decodedToken) {
          let user = { 
                        email: decodedToken.email,
                        displayName: decodedToken.displayName,
                        role: decodedToken.role
                    };

          req.headers.authorization = user;
        }
      })
    }
  }

  next();
}

export { attachUserToRequest }
