// ./src/database/redemptions.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'redemptions';

async function getRedemptionsforUser(id){
    const database = await getDatabase()
    return await database.collection(collectionName).find({userId: id}).toArray();
}

async function insertRedemption(redemption) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(redemption);
    //todo: deprecate points from employee
    return insertedId;
}
  

module.exports = {
    getRedemptionsforUser,
    insertRedemption,
};