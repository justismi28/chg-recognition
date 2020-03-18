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

async function getUserByLogin(login) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        login: login
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

async function insertDefaultUsers(){
  const database = await getDatabase();
  console.log("inserting users");
  let users = [
      {name: 'Justin Smith', login: 'justin.smith@chghealthcare.com', points: 250, nominationPoints: 500},
      {name: 'Trevor Duersch', login: 'trevor.duersch@chghealthcare.com', points: 250, nominationPoints: 500},
      {name: 'Ryan Hamblin', login: 'ryan.hamblin@chghealthcare.com', points: 250, nominationPoints: 500},
      {name: 'Curtis Porter', login: 'curtis.porter@chghealthcare.com', points: 250, nominationPoints: 500},
  ];
  await database.collection(collectionName).insertMany(users, function(err, res){
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    })
}

module.exports = {
  insertUser,
  getUsers,
  getUserById,
  getUserByLogin,
  deleteUser,
  updateUser,
  insertDefaultUsers,
};