var express = require('express');
var router = express.Router();
const {logger} = require('../logger');

const {validateIdParam} = require('./validateIdParam');
const{getRedemptionsforUser, insertRedemption, getAllRedemptions, deleteRedemption} = require('../database/redemptions');


//get all redemptions listed in the system
router.get('/', async (req, res) => {
    logger.debug('getting redemptions')
    res.send(await getAllRedemptions());
});

router.get('/:id', async (req, res) => {
    logger.debug('getting redemptions')
    if (!validateIdParam(req, res)) {
        return;
    }

    res.send(await getRedemptionsforUser(req.params.id));
});

router.post('/', async (req, res) =>{
    try {
        const newRedemption = req.body;
        let response = await insertRedemption(newRedemption);
        if (response.success) {
            res.send({ message: 'Request Redeemed and persisted.', id: response.insertedId });
        }
        else {
            res.status(400);
            res.send({ message: response.message });
        }
    }
    catch (e) {
        logger.error('Failure: ', e);
        res.status(500);
        res.send({message: '' + e});
    }
})


// endpoint to delete an nomination
router.delete('/:id', async (req, res) => {
    res.send({ message: 'Nomination Deleted.' });
    let response = {};

    if (!validateIdParam(req, res)) {
        return;
    }

    try {
        let deletedCount = await deleteRedemption(req.params.id);
        if (deletedCount == 0) {
            res.status(404);
            response.message= 'Redemption not found';
        }
        else {
            response.message= 'Redemption Deleted';
        }
    }
    catch (error) {
        logger.debug(error);
        res.status(500);
        response.message= 'Internal Error';
    }
    res.send(response);
});

module.exports = router;

