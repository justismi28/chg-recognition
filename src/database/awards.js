// ./src/database/users.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'awards';
const chgSwag = 'CHG Swag';
const chgReward = 'CHG Rewards'
const megaPrizes = 'Mega Redemptions'
const giftCards = 'Gift Cards'

async function getAwards() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function getAwardsById(id){
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        _id: new ObjectID(id),
    });
}

async function insertAllAwards(){
    const database = await getDatabase();
    console.log("inserting awards");
    let awardObj = [
        {name: 'CHG Hat', pointValue: 250, category: chgSwag},
        {name: 'CHG HeadPhones', pointValue: 250, category: chgSwag},
        {name: 'CHG Backpack', pointValue: 250, category: chgSwag},
        {name: '1 PTO Hour', pointValue: 250, category: chgReward},
        {name: 'Scott Beck\'s Parking Spot', pointValue: 250, category: megaPrizes},
        {name: 'Presidents Club', pointValue: 250, category: megaPrizes},
        {name: '$25 Visa', pointValue: 250, category: giftCards},
        {name: '$50 Visa', pointValue: 250, category: giftCards},
        {name: '$100 Visa', pointValue: 250, category: giftCards},
        {name: '$10 Cafeteria', pointValue: 250, category: giftCards},
        {name: '$15 Cafeteria', pointValue: 250, category: giftCards},
        {name: '$25 Cafeteria', pointValue: 250, category: giftCards},
    ];
    await database.collection(collectionName).insertMany(awardObj, function(err, res){
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    })
}

module.exports = {
    getAwards,
    getAwardsById,
    insertAllAwards,
};