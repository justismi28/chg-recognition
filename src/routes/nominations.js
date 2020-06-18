var express = require('express');
var router = express.Router();
const {logger} = require('../logger');

const {validateIdParam} = require('./validateIdParam');
const {insertNomination, getNominations, getNominationsByNominator, getNominationsByNominee, 
  getMyNominations, deleteNomination, updateNomination, validateNomination} = require('../database/nominations');

// defining an endpoint to return all nominations
router.get('/', async (req, res) => {
  const nominator = req.query.nominator;
  const nominee = req.query.nominee;

  if (nominator) {
    res.send(await getNominationsByNominator(nominator));
  }
  else if (nominee) {
    res.send(await getNominationsByNominee(nominee));
  }
  else {
    res.send(await getNominations());
  }
});

// endpoint to get the nominations for the logged in user
router.get('/mine/:id', async (req, res) => {
    logger.debug('Getting my nominations for ' + req.params.id);

    if (!validateIdParam(req, res)) {
        return;
    }

    res.send(await getMyNominations(req.params.id));
});
  
router.post('/', async (req, res) => {
    const newNomination = req.body;
    const validation = validateNomination(newNomination, true);
    if (validation.failed) {
        res.status(400);
        res.send({ message: 'Validation error; Missing or invalid fields: ' + validation.invalidFields.join(', ')});
        return;
    }

    try {
      let response = await insertNomination(newNomination);
      if (!response.success) {
        res.status(400);
        res.send({message: response.message});
        return;
      }
      res.send({ message: 'New Nomination inserted.', insertedId: response.insertedId });
      return;
    }
    catch (e) {
      logger.error('Failure: ' + e);
      res.status(500);
      res.send({message: '' + e});
    }
});

// endpoint to delete an nomination
router.delete('/:id', async (req, res) => {
    if (!validateIdParam(req, res)) {
        return;
    }

    await deleteNomination(req.params.id);
    res.send({ message: 'Nomination Deleted.' });
});
  
// endpoint to update an nomination
router.put('/:id', async (req, res) => {
    if (!validateIdParam(req, res)) {
        return;
    }
    const validation = validateNomination(newNomination, false);
    if (validation.failed) {
        res.status(400);
        res.send({ message: 'Missing or invalid fields: ' + validation.invalidFields.join(', ')});
        return;
    }

    const updatedNomination = req.body;
    await updateNomination(req.params.id, updatedNomination);
    res.send({ message: 'Nomination Points updated.' });
});

module.exports = router;