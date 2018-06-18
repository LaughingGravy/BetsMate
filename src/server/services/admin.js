import { createSession } from "../database/neo4jDB"

function AllCountries() {
  var session = createSession();
  return session
    .run(
      "MATCH (country:Country) RETURN country"
    )
    // .then(result => {
    //   session.close();
    //   return result.records.map(record => {
    //     return new Movie(record.get('country'));
    //   });
    // })
    .then(result => {
      session.close();
      return result.records.map(record => {
        return record.get('country').properties;
      });
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

export { AllCountries }

