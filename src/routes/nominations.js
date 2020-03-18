var express = require('express');
var router = express.Router();

const {insertNomination, getNominations, deleteNomination, updateNomination} = require('../database/nominations');

// defining an endpoint to return all nominations
router.get('/', async (req, res) => {
    res.send(await getNominations());
});

router.post('/', async (req, res) => {
    const newNomination = req.body;
    await insertNomination(newNomination);
    res.send({ message: 'New Nomination inserted.' });
});

// endpoint to delete an nomination
router.delete('/:id', async (req, res) => {
    await deleteNomination(req.params.id);
    res.send({ message: 'Nomination Deleted.' });
});
  
// endpoint to update an nomination
router.put('/:id', async (req, res) => {
    const updatedNomination = req.body;
    await updateNomination(req.params.id, updatedNomination);
    res.send({ message: 'Nomination Points updated.' });
});

module.exports = router;