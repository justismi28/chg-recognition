// ./src/database/users.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'users';

async function insertUser(user) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(user);
  return insertedId;
}

async function getUsers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getUserById(id) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        _id: new ObjectID(id),
    });
  }

async function deleteUser(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateUser(id, user) {
    const database = await getDatabase();
    delete user._id;
    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
        $set: {
            ...user,
        },
        },
    );
}

module.exports = {
  insertUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};