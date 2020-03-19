// ./src/database/nominations.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const{getUserById} = require('./users');

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

// Return a list of denormalized nominations 
async function getMyNominations(nominee) {
  const database = await getDatabase();
  let myNominations = await database.collection(collectionName).find({nomineeId: nominee}).toArray();
  // For each nomination, inline the user infor for the nominator and exclude the nominee
  // GraphQL would be helpful here but takes more time :)
  for (let index = 0; index < myNominations.length; index++) {
    let nomination = myNominations[index];
    let nominatorId = nomination.nominatorId;
    let nominator = await getUserById(nominatorId);
    if (!nominator) {
      console.log('No nominator found for nominator id ' + nomination.nominatorId);
    }
    else {
      nomination.nominator = {
        _id: nominator._id,
        name: nominator.name
      }
    }
    delete nomination.nomineeId;
    delete nomination.nominatorId;
  }
  
 return myNominations;
}

async function getNominationsByNominator(nominator) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({nominatorId: nominator}).toArray();
}

async function getNominationsByNominee(nominee) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({nomineeId: nominee}).toArray();
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


async function insertDefaultNominations(){
  const database = await getDatabase();
  console.log("inserting nominations");
  let nominations = [
      {_id: new ObjectID('5e72a2176eb55d5560830859'), nominatorId: '5e729a3c6ea33327d2851b4f', nomineeId: '5e729a3c6ea33327d2851b50', points: 50, coreValue: 'Putting People First', message: 'Great job!'},
      {_id: new ObjectID('5e72a294a5047737cc06edf0'), nominatorId: '5e729a3c6ea33327d2851b50', nomineeId: '5e729a3c6ea33327d2851b4e', points: 50, coreValue: 'Quality & Professionalism', message: 'He does excellent work!'},
  ];
  await database.collection(collectionName).insertMany(nominations, function(err, res){
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
  })
}


module.exports = {
  insertNomination,
  getNominations,
  getNominationsByNominator,
  getNominationsByNominee,
  getMyNominations,
  deleteNomination,
  updateNomination,
  insertDefaultNominations,
};