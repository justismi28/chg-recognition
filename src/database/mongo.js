// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');
const {logger} = require('../logger');

let database = null;

async function startDatabase() {
  const MONGO_URL_ENV = process.env.MONGO_URL;
  let mongoDBURL;
  if (MONGO_URL_ENV) {
    // Use external Mongo instance
    logger.debug('Using external Mongo instance');
    mongoDBURL = MONGO_URL_ENV;
  }
  else {
    // Use In-Memory Mongo
    logger.debug('Using in-memory Mongo');
    const mongo = new MongoMemoryServer();
    mongoDBURL = await mongo.getConnectionString();
  }

  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true });
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
