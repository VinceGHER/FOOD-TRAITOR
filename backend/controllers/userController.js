const UserClient = require('../models/userClient');
const UserRestaurant = require('../models/userRestaurant');
const {HTTPRes,HTTPError,checkValidity} = require('../error');
const dbf = require('../databaseFunction');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const tokenCredential = require('../tokenCredential.json')


function findDatabase(req) {
    if (req.params.userType === "restaurant"){
        return UserRestaurant;
    } else if (req.params.userType === "client"){
        return UserClient;
    } else throw new HTTPError(400,"type of user not know")  
}

exports.deleteUser = async(req, res, next) => {
    let user = await dbf.findDocumentById(findDatabase(req), req.body.userId);
    await dbf.removeDocument(user);
    return new HTTPRes(200,"User removed");
}

exports.signup = async (req, res, next) => {
    checkValidity(req,["name","password","email"]);
    let hash = await bcrypt.hash(req.body.password, 10);
    let user = new findDatabase(req)({
            name: req.body.name,
            email: req.body.email,
            password: hash
    });
   
    user = await dbf.saveDocument(user);
    return new HTTPRes(201, {
        "userId": user.id,
        "token": jwt.sign({ userId: user._id }, tokenCredential.tokenJWT, { expiresIn: '24h' })
    });
};

exports.login = async (req, res, next) => {
    checkValidity(req,["password","email"]);
    let user = await dbf.findDocumentOne(findDatabase(req),"email",req.body.email);
    let valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
        throw new HTTPError(401,"incorrect password");
    }
    return new HTTPRes(200, {
        "userId": user.id,
        "token": jwt.sign({ userId: user._id }, tokenCredential.tokenJWT, { expiresIn: '24h' })
    });
};

exports.getClientOrder = async (req,res,next) => {
    let user = await dbf.findDocumentById(UserClient, req.params.clientId);
    await user.populate({ 
        path: 'orders',
        populate : {
            path: 'mealList'
        }}).execPopulate();
    return new HTTPRes(200, user.toObject().orders);
}


exports.validToken = async (req,res,next) => {
    checkValidity(req, ["userId","token"])
    try {
        var token = req.body.token;
        var decodedToken = jwt.verify(token, tokenCredential.tokenJWT);
        var userId = decodedToken.userId;
    } catch (error){
        throw new HTTPError(400, error.message);
    }
    if (req.body.userId && req.body.userId !== userId) {
        throw new HTTPError(400, "userId and Token don't match")
    } 
    if (!(await findDatabase(req).exists({ _id: req.body.userId})))
        throw new HTTPError(400, findDatabase(req).modelName +" not found in database")
    return new HTTPRes(200, "valid");
}