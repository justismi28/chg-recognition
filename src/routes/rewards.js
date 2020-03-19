var express = require('express');
var router = express.Router();

const{getRewards, getRewardsById} = require('../database/rewards');

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

module.exports = router;