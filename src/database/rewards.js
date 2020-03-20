// ./src/database/rewards.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');
const {logger} = require('../logger');

const collectionName = 'rewards';
const chgSwag = 'CHG Swag';
const chgReward = 'CHG Rewards'
const megaPrizes = 'Mega Redemptions'
const giftCards = 'Gift Cards'

async function getRewards() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function getRewardsById(id){
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        _id: new ObjectID(id),
    });
}

async function deleteRewards(){
    const database = await getDatabase();
    await database.collection(collectionName).deleteMany({ });
}

async function insertAllRewards(){
    const database = await getDatabase();
    logger.debug('inserting Rewards');
    let rewardObj = [
        {_id: new ObjectID('5e729a3c6ea33327d2851b42'), name: 'CHG Hat', pointValue: 250, category: chgSwag, imageUrl: 'https://media.gettyimages.com/photos/red-baseball-cap-picture-id118358120?k=6&m=118358120&s=612x612&w=0&h=xAbpE_31KNSj2Mnw3qJHQSRf7OX81jTci3uX8FvQ4Cc='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b43'), name: 'CHG HeadPhones', pointValue: 250, category: chgSwag, imageUrl: 'https://media.gettyimages.com/photos/headphones-picture-id171292342?k=6&m=171292342&s=612x612&w=0&h=s_-156ygoCOeQuKG1R2CT2gRYmL3yTR8QZhH9Xe4Hy4='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b44'), name: 'CHG Backpack', pointValue: 250, category: chgSwag, imageUrl: 'https://media.gettyimages.com/photos/backpack-with-grey-and-blue-colors-picture-id167759603?k=6&m=167759603&s=612x612&w=0&h=2i896Z8ltaSAzcDf0tZVsMvqMEnreorzMCeO6sPNIT8='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b45'), name: '1 PTO Hour', pointValue: 250, category: chgReward, imageUrl: 'https://media.gettyimages.com/photos/the-colorful-deck-chairs-on-brighton-beach-uk-picture-id587231788?k=6&m=587231788&s=612x612&w=0&h=XvXOYNxWGu70e__E23xvxbQoqrceg567oRimNuN2S00='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b46'), name: 'Scott Beck\'s Parking Spot', pointValue: 250, category: megaPrizes, imageUrl: 'https://media.gettyimages.com/photos/color-stories-grey-picture-id602235813?k=6&m=602235813&s=612x612&w=0&h=No6RSxLcI80lHxWfl1TCFGBjvK8WABQ_DhloRE-Rp-s='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b47'), name: 'Presidents Club', pointValue: 250, category: megaPrizes, imageUrl: 'https://media.gettyimages.com/photos/female-friends-walking-by-window-at-airport-picture-id1010631724?k=6&m=1010631724&s=612x612&w=0&h=w7be4CVS7LWvQqM5NaKqVUedZw6rb5c9xXb1mcoKuks='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b48'), name: '$25 Visa', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/visa-credit-cards-are-arranged-on-a-desk-february-25-2008-in-san-picture-id79989029?k=6&m=79989029&s=612x612&w=0&h=yNgQgi3U05gW-5Agfh4tXJexFm-n4eutjAxyCcWqrpY='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b49'), name: '$50 Visa', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/visa-credit-cards-are-arranged-on-a-desk-february-25-2008-in-san-picture-id79989029?k=6&m=79989029&s=612x612&w=0&h=yNgQgi3U05gW-5Agfh4tXJexFm-n4eutjAxyCcWqrpY='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b4a'), name: '$100 Visa', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/visa-credit-cards-are-arranged-on-a-desk-february-25-2008-in-san-picture-id79989029?k=6&m=79989029&s=612x612&w=0&h=yNgQgi3U05gW-5Agfh4tXJexFm-n4eutjAxyCcWqrpY='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b4b'), name: '$10 Cafeteria', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/serving-lunch-in-cafetreria-picture-id657021234?k=6&m=657021234&s=612x612&w=0&h=zxcXOrL3N35AaGx_wX9FWAfWVCCDwF-i4QNFU9iAqN0='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b4c'), name: '$15 Cafeteria', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/serving-lunch-in-cafetreria-picture-id657021234?k=6&m=657021234&s=612x612&w=0&h=zxcXOrL3N35AaGx_wX9FWAfWVCCDwF-i4QNFU9iAqN0='},
        {_id: new ObjectID('5e729a3c6ea33327d2851b4d'), name: '$25 Cafeteria', pointValue: 250, category: giftCards, imageUrl: 'https://media.gettyimages.com/photos/serving-lunch-in-cafetreria-picture-id657021234?k=6&m=657021234&s=612x612&w=0&h=zxcXOrL3N35AaGx_wX9FWAfWVCCDwF-i4QNFU9iAqN0='},
    ];
    await database.collection(collectionName).insertMany(rewardObj, function(err, res){
        if (err) throw err;
        logger.debug('Number of documents inserted: ' + res.insertedCount);
    })
}

module.exports = {
    getRewards,
    getRewardsById,
    insertAllRewards,
    deleteRewards
};