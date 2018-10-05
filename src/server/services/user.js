import { createSession } from "../database/neo4jDB"

let userService = {
  FindOne: (email) => {

    console.log("email", email)
    let session = createSession()
    return session
      .run(
        `MATCH (user:User { email: "${email}" }) 
        RETURN user
        LIMIT 1`
      )
      .then(result => {
        session.close()    
        if (result.records.length === 1) {
          const record = result.records.shift()
          return record.get('user').properties
        }
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  CreateOne: (user) => {
    const { email, displayName, role, registerDate, lastAccessDate,
            passwordHash, verified, emailVerificationHash, emailVerificationExpiry, 
            passwordResetHash, tempTwoFactorSecret, twoFactorSecret } = user
      
    let session = createSession()
    return session
      .run(
        `CREATE (user:User { email: "${email}" })
          SET user.displayName =  "${displayName}",
              user.role =  "${role}",
              user.registerDate = "${registerDate}",
              user.lastAccessDate =  "${lastAccessDate}",
              user.passwordHash =  "${passwordHash}",
              user.passwordResetHash =  "${passwordResetHash}",
              user.verified =  "${verified}",
              user.emailVerificationHash = "${emailVerificationHash}",
              user.emailVerificationExpiry = "${emailVerificationExpiry}",
              user.twoFactorSecret = "${twoFactorSecret}",
              user.tempTwoFactorSecret = "${tempTwoFactorSecret}",
              user.twoFactorSecret =  "${twoFactorSecret}"
        RETURN user`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('user').properties
        });
      })
      .catch(error => {
        session.close();
        console.log("CreateOne Error: ", error)
        throw error;
      })
  },

  UpdateOne: (user) => {
    const { email, displayName, role, registerDate, lastAccessDate,
            passwordHash, verified, emailVerificationHash, emailVerificationExpiry, 
            passwordResetHash, tempTwoFactorSecret, twoFactorSecret } = user
    
    let session = createSession()
    return session
      .run(
        `UPDATE (user:User { email: "${email}" })
          SET user.displayName =  "${displayName}",
              user.role =  "${role}",
              user.registerDate =  "${registerDate}",
              user.lastAccessDate =  "${lastAccessDate}",
              user.passwordHash =  "${passwordHash}",
              user.passwordResetHash =  "${passwordResetHash}",
              user.verified =  "${verified}",
              user.emailVerificationHash = "${emailVerificationHash}",
              user.emailVerificationExpiry = "${emailVerificationExpiry}",
              user.twoFactorSecret = "${twoFactorSecret}",
              user.tempTwoFactorSecret = "${tempTwoFactorSecret}",
              user.twoFactorSecret =  "${twoFactorSecret}"
        RETURN user`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('user').properties
        });
      })
      .catch(error => {
        session.close();
        throw error;
      })
  }
}

export default userService