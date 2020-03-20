// ./src/database/redemptions.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');
const{getUserById, updateUser} = require('./users');
const{getRewardsById} = require('./rewards');
const {logger} = require('../logger');

const collectionName = 'redemptions';

async function getAllRedemptions() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getRedemptionsforUser(id){
    const database = await getDatabase()
    return await database.collection(collectionName).find({userId: id}).toArray();
}

async function insertRedemption(redemption) {
    const database = await getDatabase();
    let response = await updateUserPoints(redemption);
    redemption['created_date'] = new Date();
    const {insertedId} = await database.collection(collectionName).insertOne(redemption); 
    response.insertedId = insertedId;
    return response;
}

async function deleteRedemption(id) {
    const database = await getDatabase();
    const response = await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
    return response.deletedCount;
}

async function updateUserPoints(redemption) {
    let response = {success: true};
    const database = await getDatabase();

    let getUserQuery = {_id: redemption.userId};

    let user = await getUserById(redemption.userId);
    if (!user) {
      return { success : false, message: 'No user found with id ' + redemption.userId };
    }
  
    let userPoints = user.points;

    let reward = await getRewardsById(redemption.rewardId);
    if (!reward) {
        response.success = false;
        response.message = 'Could not find reward for ' + redemption.rewardId;
        return response;
    }
    let rewardPoints = reward.pointValue;

    if(rewardPoints > userPoints){
        response.success = false;
        response.message = 'Reward is worth more than the user has. Cancelling transation.';
        return response;
    }

    user.points -= rewardPoints;
    logger.debug('After redemption transaction user\'s new points are: ' + user.points);

    // Save the user again
    await updateUser(redemption.userId, user);

    return response;
}



module.exports = {
    getRedemptionsforUser,
    insertRedemption,
    getAllRedemptions,
    deleteRedemption
};