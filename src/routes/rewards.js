var express = require('express');
var router = express.Router();
const {logger} = require('../logger');

const {validateIdParam} = require('./validateIdParam');
const{getRewards, getRewardsById, deleteRewards} = require('../database/rewards');

//get all rewards listed in the system
router.get('/', async (req, res) => {
    logger.debug('getting rewards')
    res.send(await getRewards());
});

//get rewards by ID
router.get('/:id', async (req, res) => {
    if (!validateIdParam(req, res)) {
        return;
    }

    logger.debug('getting rewards')
    res.send(await getRewardsById(req.params.id));
});

//delete rewards by ID
router.delete('/', async (req, res) => {
    logger.debug('deleting rewards')
    res.send(await deleteRewards());
});

module.exports = router;