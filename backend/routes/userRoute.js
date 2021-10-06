const express = require('express');
const router = express.Router();
const {HTTPRes,HTTPError, errorHandler} = require('../error.js');



const userCtrl = require('../controllers/userController');
const multer = require('../middleware/multer-config');

router.post('/:userType/signup', errorHandler(userCtrl.signup));
router.post('/:userType/login', errorHandler(userCtrl.login));
router.post('/:userType/validToken', errorHandler(userCtrl.validToken));
router.get('/:clientId/orders', errorHandler(userCtrl.getClientOrder));
router.delete('/', errorHandler(userCtrl.deleteUser));

module.exports = router;