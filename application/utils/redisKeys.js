

const getRedisKey = (keyName) => `${keyName}__${process.env.PORT}`

const commonDataRedisKey = getRedisKey('common_data')
const gpDataRedisKey = getRedisKey('gp_data')


// time is in seconds
const MY_TIME = {
    FIVE_HOURS: 5 * 60 * 60
}

module.exports = {
    commonDataRedisKey,
    gpDataRedisKey,
    MY_TIME
}