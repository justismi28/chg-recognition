var express = require('express');
var router = express.Router();

const {validateIdParam} = require('./validateIdParam');
const{getRedemptionsforUser, insertRedemption} = require('../database/redemptions');


router.get('/:id', async (req, res) => {
    console.log('getting redemptions')
    if (!validateIdParam(req, res)) {
        return;
    }

    res.send(await getRedemptionsforUser(req.params.id));
});

router.post('/', async (req, res) =>{
    const newRedemption = req.body;
    let redemptionId = await insertRedemption(newRedemption);
    res.send({ message: 'Request Redeemed and persisted.', id: redemptionId });
})

module.exports = router;

