const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => { 
    const authorization = request.body.token
    if (authorization){ //&& authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization
    } else { 
        return response.status(401).json({
            error: '_token expired'
        })
    }
    
    next()
}

const userExtractor = (request, response, next) => {     
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const user = {
        id: decodedToken.id,
        username: decodedToken.username
    }
    console.log('🚀 ~ userExtractor ~ user', user);
    request.user = user
    next()
}

const requestLogger = (request, response, next) => { 
    logger.info('--- Request ---')
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => { 
    response.status(404).send({error: 'Unknown Endpoint'})
}

const errorHandler = (error, request, response, next) => { 
    logger.error(error.message)

    if (error.name === 'CastError') { 
        return response.status(400).send({error: 'malformatted id'})
    }

    if (error.name === 'ValidationError') { 
        return response.status(401).json({
            error: error.message
        })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    if (error.name === 'TokenExpiredError') { 
        return response.status(401).json({
            error: 'token expired'
        })
    }
 
    next(error)
}

module.exports = {
    userExtractor,
    tokenExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler,
}
