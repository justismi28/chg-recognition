var express = require('express');
var router = express.Router();

const{getRewards, getRewardsById, deleteRewards} = require('../database/rewards');

//get all rewards listed in the system
router.get('/', async (req, res) => {
    console.log('getting rewards')
    res.send(await getRewards());
});

//get rewards by ID
router.get('/:id', async (req, res) => {
    console.log('getting rewards')
    res.send(await getRewardsById(req.params.id));
});

//delete rewards by ID
router.delete('/', async (req, res) => {
    console.log('deleting rewards')
    res.send(await deleteRewards());
});

module.exports = router;