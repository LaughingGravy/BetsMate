import jwt from 'jsonwebtoken'
import Config from '../../../utilities/Config'
import { convertStringToDate } from '../services/authHelper'


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

        if ((Date.now() / 1000) > decodedToken.exp ) {
          console.log("attachUserToRequest expired token")
          res.clearCookie("betsmate")
          next();
        }

        if (decodedToken) {
          let user = { 
                        email: decodedToken.email,
                        displayName: decodedToken.displayName,
                        role: decodedToken.role
                    };

          req.user = user;
        }
      })
    }
  }

  next();
}

export { attachUserToRequest }


  // if (token) {
  //   const decoded = jwt.verify(
  //     token.replace('Bearer ', ''),
  //     process.env.JWT_SECRET
  //   );
  //   req.user = decoded;
  //   next();
  // } else {
  //   res
  //     .status(401)
  //     .send({ message: 'You must supply a JWT for authorization!' });
  // }
//};