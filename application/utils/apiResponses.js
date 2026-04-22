const sendApiResponse = (_res, _statusCode = 200, _success = false, _message = '', _data = null, _error = null) => {
    return _res.status(_statusCode).json({
        statusCode: _statusCode,
        success: _success,
        message: _message,
        data: _data,
        error: _error
    })
}


const sendApiError = (_res, _statusCode = 500, _success = false, _message = '', _data = null, _error = null) => {
    return _res.status(_statusCode).json({
        statusCode: _statusCode,
        success: _success,
        message: _message,
        data: _data,
        error: _error
    })
}


const renderNormalPage = (_res, _renderUrl, _renderObject) => {
    return _res.render(_renderUrl, _renderObject)
}

module.exports = {
    sendApiResponse,
    sendApiError,
    renderNormalPage
}