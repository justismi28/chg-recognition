// ./src/database/nominations.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');
const {logger} = require('../logger');

const{getUserById, updateUser} = require('./users');

const collectionName = 'nominations';

function validateNomination(nomination, isNew) {
  const validation = { invalidFields: [] };
  const invalidFields = validation.invalidFields;
  const CORE_VALUES = [ 'Growth', 'Putting People First', 'Continuous Improvement', 'Integrity & Ethics', 'Quality & Professionalism'];

  if (isNew && (nomination.id || nomination._id)) {
    invalidFields.push('id must not be included when inserting a new nomination');   
  }
  else if (!isNew && !nomination._id) {
    invalidFields.push('_id must be included when updating a nomination');   
  }
  if (!nomination.nominatorId) {
    invalidFields.push('nominatorId');   
  }
  if (!nomination.nomineeId) {
    invalidFields.push('nomineeId');   
  }
  if (!(nomination.points >= 0)) {
    invalidFields.push('points');   
  }
  if (!nomination.coreValue) {
    invalidFields.push('coreValue');   
  }
  else if (!CORE_VALUES.includes(nomination.coreValue)) {
    invalidFields.push('coreValue (invalid value; must be one of: ' + CORE_VALUES.join(', ') + ')');
  }
  if (!nomination.message) {
    invalidFields.push('message');   
  }

  if (invalidFields.length > 0) {
    validation.failed = true;
  }

  return validation;
}

async function insertNomination(nomination) {
  const database = await getDatabase();
  nomination.date = new Date();

  // Get the user
  let nominatorId = nomination.nominatorId;
  let nominator = await getUserById(nominatorId);
  logger.debug('insertNomination for nominator ' + nominatorId);
  if (!nominator) {
    logger.error('insertNomination found no nominator with id ' + nominatorId);
    return { success : false, message: 'No nominator found with nominator id ' + nominatorId };
  }

  // Decrement their points
  nominator.nominationPoints -= nomination.points;
  // Throw an error if they don't actually have that many points
  if (nominator.nominationPoints < 0) {
    logger.error('Insufficient nomination points to complete this nomination' );
    return { success: false, message: 'Insufficient nomination points to complete this nomination' };
  }

  // Save the user again
  await updateUser(nominatorId, nominator);

  await incrementNomineePoints(nomination);

  const {insertedId} = await database.collection(collectionName).insertOne(nomination);
  return { success: true, insertedId: insertedId };
}

async function incrementNomineePoints(nomination) {
  let nomineeId = nomination.nomineeId;
  let nominee = await getUserById(nomineeId);

  nominee.points += nomination.points;

  await updateUser(nomineeId, nominee);

  return { success: true };
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
      logger.debug('No nominator found for nominator id ' + nomination.nominatorId);
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
    const response = await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
    return response.deletedCount;
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
  logger.debug("inserting nominations");
  let nominations = [
      {_id: new ObjectID('5e72a2176eb55d5560830859'), date: '2020-03-20T14:32:27Z', nominatorId: '5e729a3c6ea33327d2851b4f', nomineeId: '5e729a3c6ea33327d2851b50', points: 50, coreValue: 'Putting People First', message: 'Great job!'},
      {_id: new ObjectID('5e72a294a5047737cc06edf0'), date: '2020-03-20T13:05:52Z', nominatorId: '5e729a3c6ea33327d2851b50', nomineeId: '5e729a3c6ea33327d2851b4e', points: 50, coreValue: 'Quality & Professionalism', message: 'He does excellent work!'},
  ];
  await database.collection(collectionName).insertMany(nominations, function(err, res){
      if (err) throw err;
      logger.debug("Number of documents inserted: " + res.insertedCount);
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
  validateNomination
};
