const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug'
})
logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
}));
logger.add(new winston.transports.File({
    filename: '/var/log/nodejs/winston.log',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
}));

module.exports = {
    logger,
};