import uuidv4 from "uuid/v4";

import { createSession } from "../database/neo4jDB"

let stadiumService = {
  AllStadia: () => {
    let session = createSession()
    return session
      .run(
        `MATCH (s:Stadium)-[r:LOCATED_IN]->(c:Country)
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
        RETURN stadium
        ORDER BY stadium.country.name, stadium.name`
      )
      .then(result => {
        session.close()
        return result.records.map(record => {
          return record.get('stadium')
        });
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  GetStadiumById: (stadiumId) => {
    let session = createSession()
    return session
      .run(
        `MATCH (s:Stadium { stadiumId: "${stadiumId}" })-[r:LOCATED_IN]->(c:Country)
        WHERE s.stadiumId = "${stadiumId}"
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
        RETURN stadium`
      )
      .then(result => {
        session.close()    
        const record = result.records.shift()
        return record.get('stadium');
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  CreateStadium: ({ name, city, country}) => {
    const stadiumId = uuidv4();
    let session = createSession()
    return session
      .run(
        `MATCH (c:Country {code: "${country.code}" })
         CREATE (s:Stadium { stadiumId: "${stadiumId}", name: "${name}", city: "${city}" })-[:LOCATED_IN]->(c)
         WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
         RETURN stadium
         `
      )
      .then(result => {
        session.close()    
        const record = result.records.shift()
        return record.get("stadium")
      })
      .catch(error => {
        session.close()
        throw error
      })
  },

  MergeStadium: ( { stadiumId, name, city, country }) => {
    let session = createSession()
    return session
      .run(
        `MATCH (country:Country {code: "${country.code}" })
        MERGE (s:stadium {stadiumId: "${stadiumId}" })-[r:LOCATED_IN]->(country:Country)
          SET s.name =  "${name}",
              s.city = "${city}"
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
        RETURN stadium`
      )
      .then(result => {
        session.close();
        const record = result.records.shift()
        return record.get("stadium")
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
        `MATCH (s:stadium {stadiumId: "${stadiumId}" })
        DETACH DELETE s
        RETURN s`
      )
      .then(result => {
        session.close();
        const record = result.records.shift()
        console.log("result", result)
        return record.get("stadium").properties
      })
      .catch(error => {
        session.close();
        throw error;
      })
  }
};

export default stadiumService;