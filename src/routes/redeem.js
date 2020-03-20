var express = require('express');
var router = express.Router();

const {validateIdParam} = require('./validateIdParam');
const{getRedemptionsforUser, insertRedemption, getAllRedemptions} = require('../database/redemptions');


//get all redemptions listed in the system
router.get('/', async (req, res) => {
    console.log('getting redemptions')
    res.send(await getAllRedemptions());
});

router.get('/:id', async (req, res) => {
    console.log('getting redemptions')
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
        console.error('Failure: ', e);
        res.status(500);
        res.send({message: '' + e});
    }
})

module.exports = router;

