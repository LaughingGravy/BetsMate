import uuidv4 from "uuid/v4";
 
import { createSession } from "../database/neo4jDB"

let stadiumService = {
  AllStadia: async () => {
    let session = await createSession()
    try {
      const result = await session.run(
        `MATCH (s:Stadium)-[r:LOCATED_IN]->(c:Country)
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
        RETURN stadium
        ORDER BY stadium.country.name, stadium.name`);
      session.close();
      return result.records.map(record => {
        return record.get('stadium');
      });
    }
    catch (error) {
      session.close();
      throw error;
    }
  },

  GetStadiumById: async (stadiumId) => {
    let session = await createSession()
    try {
      const result = await session.run(`
        MATCH (s:Stadium { stadiumId: "${stadiumId}" })-[r:LOCATED_IN]->(c:Country)
        WHERE s.stadiumId = "${stadiumId}"
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
        RETURN stadium`);
      session.close();
      const record = result.records.shift();
      return record.get('stadium');
    }
    catch (error) {
      session.close();
      throw error;
    }
  },

  CreateStadium: async ({ name, city, country}) => {
   const stadiumId = uuidv4();
    let session = createSession()
    return await session
      .run(
        `MATCH (c:Country {code: "${country.code}" })
         CREATE (s:Stadium { stadiumId: "${stadiumId}", name: "${name}", city: "${city}" })-[:LOCATED_IN]->(c)
         WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
         RETURN stadium`)
      .then(result => {
        session.close();
        const record = result.records.shift();
        return record.get("stadium");
      })
      .catch (error => {
        session.close();
        throw error;
      })
  },

  MergeStadium: async ( { stadiumId, name, city, country }) => {
    let session = createSession()
    return await session
      .run(
        `MATCH (s:Stadium {stadiumId: "${stadiumId}"})-[r:LOCATED_IN]->(c:Country), (newC: Country {code: "${country.code}"})
        DELETE r
        SET s.city = "${city}", s.name = "${name}"
        MERGE (s)-[r2:LOCATED_IN]->(newC)
        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(newC)}) as stadium
        RETURN stadium`)
      .then(result => {
        session.close();
        const record = result.records.shift();
        return record.get("stadium");
      })
      .catch (error => {
        console.log("merge stadium errror")
        session.close();
        throw error;
      })
  },

  // MergeStadium: async ( { stadiumId, name, city, country }) => {
  //   let session = createSession()
  //   try {
  //     const result = await session.run(
  //       `MATCH (country:Country {code: "${country.code}" })
  //        MERGE (s:stadium {stadiumId: "${stadiumId}" })-[r:LOCATED_IN]->(country:Country)
  //        SET s.name =  "${name}",s.city = "${city}"
  //        WITH ({stadiumId: s.stadiumId, name: s.name, city: s.city, country:PROPERTIES(c)}) as stadium
  //        RETURN stadium`);
  //     session.close();
  //     const record = result.records.shift();
  //     return record.get("stadium");
  //   }
  //   catch (error) {
  //     console.log("merge stadium errror")
  //     session.close();
  //     throw error;
  //   }
  // },

  DeleteStadium: async ({ stadiumId }) => {
    let session = createSession()
    try {
      const result = await session.run(
        `MATCH (stadium:Stadium {stadiumId: "${stadiumId}" })
        DETACH DELETE stadium
        RETURN stadium`);
      session.close();
      const record = result.records.shift();
      return record.get("stadium").properties;
    }
    catch (error) {
      session.close();
      throw error;
    }
  }
};

export default stadiumService;