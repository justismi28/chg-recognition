// ./src/database/users.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'users';

function validateUser(user) {
  let invalidFields = [];
  let validation = { invalidFields: invalidFields };

  if (!user.name) {
    invalidFields.push('name');   
  }
  if (!user.login) {
    invalidFields.push('login');   
  }
  if (!(user.points >= 0)) {
    invalidFields.push('points');   
  }
  if (!(user.nominationPoints >= 0)) {
    invalidFields.push('nominationPoints');   
  }

  if (invalidFields.length > 0) {
    validation.failed = true;
  }

  return validation;
}

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
    let result = await database.collection(collectionName).findOne({
        _id: new ObjectID(id)
    });
    return result;
  }

async function getUserByLogin(login) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        login: login
    });
  }

async function deleteUser(id) {
    const database = await getDatabase();
    const response = await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
    console.log('Delete response ', response.deletedCount);
    return response.deletedCount;
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
      {"_id": new ObjectID("5e729a3c6ea33327d2851b4e"), name: 'Justin Smith', login: 'justin.smith@chghealthcare.com', points: 250, nominationPoints: 100},
      {"_id": new ObjectID("5e729a3c6ea33327d2851b4f"), name: 'Trevor Duersch', login: 'trevor.duersch@chghealthcare.com', points: 250, nominationPoints: 100},
      {"_id": new ObjectID("5e729a3c6ea33327d2851b50"), name: 'Ryan Hamblin', login: 'ryan.hamblin@chghealthcare.com', points: 250, nominationPoints: 100},
      {"_id": new ObjectID("5e729a3c6ea33327d2851b51"), name: 'Curtis Porter', login: 'curtis.porter@chghealthcare.com', points: 250, nominationPoints: 100},
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
  validateUser,
};