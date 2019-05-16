
import { createSession } from "../database/neo4jDB"

let countryService = {
  AllCountries: async () => {
    let session = createSession()
    return await session
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

  GetCountryByCode: async (code) => {
    let session = createSession()
    return await session
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

  GetCountriesByName: async ({ name, skip, limit }) => {
    let session = createSession()
    return await session
      .run(
        `MATCH (c:Country) 
        WHERE c.name =~ "(?i)${name}.*"
        RETURN c
        ORDER BY c.name ASC
        SKIP ${skip}
        LIMIT ${limit}`
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


  CreateCountry: async ({ code, name }) => {
    let session = createSession()
    return await session
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

  MergeCountry: async ( { code, name }) => {
    console.log("merge country")
    let session = createSession()
    return await session
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

  DeleteCountry: async ({ code }) => {
    let session = createSession()
    return await session
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

