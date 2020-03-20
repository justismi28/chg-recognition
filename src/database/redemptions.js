// ./src/database/redemptions.js
const {getDatabase} = require('./mongo');
const{getUserById, updateUser} = require('./users');
const{getRewardsById} = require('./rewards');

const collectionName = 'redemptions';
const rewardsCollectionName = 'rewards';

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
    await updateUserPoints(redemption);
    redemption['created_date'] = Date.now();
    const {insertedId} = await database.collection(collectionName).insertOne(redemption); 
    return insertedId;
}

async function updateUserPoints(redemption) {
    const database = await getDatabase();

    let getUserQuery = {_id: redemption.userId};

    let user = await getUserById(redemption.userId);
    if (!user) {
      return { success : false, message: 'No user found with id ' + redemption.userId };
    }
  
    let userPoints = user.points;

    console.log('redemption: ' + JSON.stringify(redemption, null, 2));
    let reward = await getRewardsById(redemption.rewardId);
    if (!reward) {
        throw new Error('Could not find reward for ' + redemption.rewardId);
    }
    let rewardPoints = reward.pointValue;

    if(rewardPoints > userPoints){
        throw new Error('Reward is worth more than the user has. Cancelling transation.')
    }

    user.points -= rewardPoints;
    console.log('After redemption transaction user\'s new points are: ' + user.points);

    
    // Save the user again
    await updateUser(redemption.userId, user);
}



module.exports = {
    getRedemptionsforUser,
    insertRedemption,
    getAllRedemptions,
};