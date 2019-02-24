
import { createSession } from "../database/neo4jDB"

let countryService = {
  AllCountries: () => {
    let session = createSession()
    return session
      .run(
        `MATCH (country:Country) 
        RETURN country
        ORDER BY country.name ASC`
      )
      .then(result => {
        session.close()
        return result.records.map(record => {
          return record.get('country').properties
        });
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  GetCountryByCode: (code) => {
    let session = createSession()
    return session
      .run(
        `MATCH (country:Country { code: "${code}" }) 
        RETURN country
        LIMIT 1`
      )
      .then(result => {
        session.close()    
        if (result.records.length === 1) {
          const record = result.records.shift()
          return record.get('country').properties
        }
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  CreateCountry: ({ code, name }) => {
    let session = createSession()
    return session
      .run(
        `CREATE (country:Country { code: "${code}", name: "${name}" }) 
        RETURN country`
      )
      .then(result => {
        session.close();
        const record = result.records.shift()
        return record.get("country").properties
      })
      .catch(error => {
        session.close();
        throw error;
      })
  },

  MergeCountry: ( { code, name }) => {
    console.log("merge country")
    let session = createSession()
    return session
      // .run(
      //   `CREATE (country:Country { code: "${code}", name: "${name}" }) 
      //   RETURN country`
      // )
      .run(
        `MERGE (country:Country { code: "${code}" })
          SET country.name =  "${name}"
        RETURN country`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('country').properties
        });
      })
      .catch(error => {
        session.close();
        throw error;
      })
  },

  DeleteCountry: ({ code }) => {
    let session = createSession()
    return session
      .run(
        `MATCH (country:Country { code: "${code}" }) 
        DETACH DELETE country
        RETURN country`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('country').properties
        });
      })
      .catch(error => {
        session.close();
        throw error;
      })
  }
};

export default countryService;

