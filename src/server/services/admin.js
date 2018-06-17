import { createSession } from "../database/neo4jDB"

export function getCountries() {
  var session = createSession();
  return session
    .run(
      "MATCH (country:Country) RETURN movie"
    )
    .then(result => {
      session.close();
      return result.records.map(record => {
        return new Movie(record.get('movie'));
      });
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

