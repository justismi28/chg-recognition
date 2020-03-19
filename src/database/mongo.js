// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
  const MONGO_URL_ENV = process.env.MONGO_URL;
  let mongoDBURL;
  if (MONGO_URL_ENV) {
    // Use external Mongo instance
    console.log('Using external Mongo instance');
    mongoDBURL = MONGO_URL_ENV;
  }
  else {
    // Use In-Memory Mongo
    console.log('Using in-memory Mongo');
    const mongo = new MongoMemoryServer();
    mongoDBURL = await mongo.getConnectionString();
  }

  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};