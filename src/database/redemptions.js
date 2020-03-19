// ./src/database/redemptions.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'redemptions';
const rewardsCollectionName = 'rewards';
const usersCollectionName = 'users';

async function getRedemptionsforUser(id){
    const database = await getDatabase()
    return await database.collection(collectionName).find({userId: id}).toArray();
}

async function insertRedemption(redemption) {
    const database = await getDatabase();
    updateUser(redemption);
    const {insertedId} = await database.collection(collectionName).insertOne(redemption); 
    return insertedId;
}

async function updateUser(redemption) {
    const database = await getDatabase();

    let getUserQuery = {_id: redemption.userId};

    let user = await database.collection(usersCollectionName).findOne({_id: redemption.userId});
    let userPoints = user.points;

    let reward = await database.collection(rewardsCollectionName).findOne({_id: redemption.rewardId})
    let rewardPoints = reward.pointValue;

    if(rewardPoints > userPoints){
        throw new Error('Reward is worth more than the user has. Cancelling transation.')
    }

    let newPoints = userPoints - rewardPoints;
    console.log('Redemption Transaction new points: ' + newPoints);

    let newValues = { $set: {points: newPoints}};

    
    await database.collection(usersCollectionName).updateOne(getUserQuery, newValues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated.");
    });

}



module.exports = {
    getRedemptionsforUser,
    insertRedemption,
};