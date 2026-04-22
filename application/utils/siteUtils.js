const getOrigin = (request) => {
    const origin = `${request.protocol}://${request.get('host')}`;
    return origin
}


module.exports = getOrigin