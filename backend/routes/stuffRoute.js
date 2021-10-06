const express = require('express');
const router = express.Router();
const {HTTPRes,HTTPError, errorHandler} = require('../error.js');

const stuffCtrl = require('../controllers/restaurantController');
const multer = require('../middleware/multer-config');
const {authUserClient,authUserRestaurant} = require('../middleware/auth');


//router.get('/', auth, stuffCtrl.getAllStuff);
router.get('/:restaurantId', errorHandler(stuffCtrl.getRestaurantMeal));
router.get('/:restaurantId/orders', errorHandler(authUserRestaurant), errorHandler(stuffCtrl.getOrders));
router.put('/:restaurantId/categories/:categorieId', multer,errorHandler(authUserRestaurant), errorHandler(stuffCtrl.addMeal));
router.delete('/:restaurantId/categories/:categorieId', errorHandler(authUserRestaurant), errorHandler(stuffCtrl.deleteMeal));
router.post('/',multer, errorHandler(authUserRestaurant), errorHandler(stuffCtrl.createRestaurant));
router.delete('/', errorHandler(authUserRestaurant),errorHandler(stuffCtrl.deleteRestaurant));

router.put('/:restaurantId/categories', errorHandler(authUserRestaurant), errorHandler(stuffCtrl.addCategorie));
router.put('/:restaurantId/orders',errorHandler(authUserClient), errorHandler(stuffCtrl.addOrder));
router.delete('/:restaurantId/orders',errorHandler(authUserClient), errorHandler(stuffCtrl.removeOrder));
router.delete('/:restaurantId/categories', errorHandler(authUserRestaurant),errorHandler(stuffCtrl.deleteCategorie));

//router.delete('/:id', stuffCtrl.deleteMeal);

module.exports = router;