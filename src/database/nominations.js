// ./src/database/nominations.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'nominations';

async function insertNomination(nomination) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(nomination);
  return insertedId;
}

async function getNominations() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteNomination(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateNomination(id, nomination) {
    const database = await getDatabase();
    delete nomination._id;
    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
        $set: {
            ...nomination,
        },
        },
    );
}


module.exports = {
  insertNomination,
  getNominations,
  deleteNomination,
  updateNomination,
};