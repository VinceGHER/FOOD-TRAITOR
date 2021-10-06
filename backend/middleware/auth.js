const jwt = require('jsonwebtoken');
const tokenCredential = require('../tokenCredential.json')
const {UserClient,UserRestaurant} = require('../models/userClient');
const { checkValidity, HTTPError, errorHandler, HTTPRes } = require('../error');

async function authBase(req, res, next, UserType) {
    return "next"
    checkValidity(req, ["userId"])
    try {
        var token = req.headers.authorization.split(' ')[1];
        var decodedToken = jwt.verify(token, tokenCredential.tokenJWT);
        var userId = decodedToken.userId;
    } catch (error){
        throw new HTTPError(400, error.message);
    }
    if (req.body.userId && req.body.userId !== userId) {
        throw new HTTPError(400, "userId and Token don't match")
    } 
    if (!(await UserType.exists({ _id: req.body.userId})))
        throw new HTTPError(400, UserType.modelName +" not found in database")
    return "next"
}

module.exports.authUserClient = async (req, res, next) => {
    return await authBase(req, res, next, UserClient);
    
};

module.exports.authUserRestaurant = async (req, res, next) => {
    return await authBase(req, res, next,UserRestaurant);
};