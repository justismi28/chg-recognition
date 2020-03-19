// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {insertUser} = require('./database/users');
const nominationsRouter = require('./routes/nominations');
const usersRouter = require('./routes/users');
const rewardsRouter = require('./routes/rewards');
const redeemRouter = require('./routes/redeem.js');

const {startDatabase} = require('./database/mongo');
const{insertAllRewards, getRewards} = require('./database/rewards');
const{insertDefaultUsers} = require('./database/users');
const{insertDefaultNominations} = require('./database/nominations');

const swagger = require('./controllers/swagger')

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled rejection at: ', p, ' reason: ', reason);
});

// defining the Express app
const app = express();


app.use('/api-docs', swagger.router)


// adding Helmet to enhance security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Routes
app.use('/users', usersRouter);
app.use('/nominations', nominationsRouter);
app.use('/rewards', rewardsRouter);
app.use('/redeem', redeemRouter);

//simple endpoint to return base information about the app.
app.get('/', async (req, res) => {
    let pjson = require('../package.json');
    res.status(200);
    res.send({
        "name":pjson.name,
        "version": pjson.version,
        "description": pjson.description,
    });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    const existingAwards = await getRewards();
    if (existingAwards.length == 0) {
        await insertAllRewards();
        await insertDefaultUsers();
        await insertDefaultNominations();
    }

    // start the server
    app.listen(8081, async () => {
      console.log('listening on port 8081');
    });
});