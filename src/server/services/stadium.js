import uuidv4 from "uuid/v4";

import { createSession } from "../database/neo4jDB"

let stadiumService = {
  AllStadia: () => {
    let session = createSession()
    return session
      .run(
        `MATCH (stadium:Stadium) 
        RETURN stadium
        ORDER BY stadium.name ASC`
      )
      .then(result => {
        session.close()
        return result.records.map(record => {
          return record.get('stadium').properties
        });
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  GetStadium: (id) => {
    let session = createSession()
    return session
      .run(
        `MATCH (stadium:Stadium { id: "${id}" }) 
        RETURN stadium
        LIMIT 1`
      )
      .then(result => {
        session.close()    
        if (result.records.length === 1) {
          const record = result.records.shift()
          return record.get('stadium').properties
        }
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  CreateStadium: ({ name, city, countryCode }) => {
    const id = uuidv4();
    let session = createSession()
    return session
      .run(
        `CREATE (stadium:Stadium { id: ${id}, name: "${name}", city: "${city}", , countryCode: "${countryCode}" }) 
        RETURN stadium`
      )
  },

  MergeStadium: ( { id, name, city, countryCode }) => {
    let session = createSession()
    return session
      // .run(
      //   `CREATE (country:Country { code: "${code}", name: "${name}" }) 
      //   RETURN country`
      // )
      .run(
        `MERGE (stadium:Stadium { id: ${id} })
          SET stadium.name =  "${name}",
              stadium.city = "${city}",
              stadium.countryCode = "${countryCode}",
        RETURN country`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('stadium').properties
        });
      })
      .catch(error => {
        session.close();
        throw error;
      })
  },

  DeleteStadium: ({ id }) => {
    let session = createSession()
    return session
      .run(
        `MATCH (stadium:Stadium { id: ${id} }) 
        DELETE stadium
        RETURN stadium`
      )
      .then(result => {
        session.close();
        return result.records.map(record => {
          return record.get('stadium').properties
        });
      })
      .catch(error => {
        session.close();
        throw error;
      })
  }
};

export default stadiumService;