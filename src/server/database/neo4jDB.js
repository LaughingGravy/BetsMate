
import Config from "../../../utilities/Config"

let neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(Config.bolt, neo4j.auth.basic(Config.neoUsername, Config.neoPassword));

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!
export function createSession() {
  return driver.session()
}

// Close the driver when application exits.
// This closes all used network connections.
export function closeDriver() {
  driver.close();
}

