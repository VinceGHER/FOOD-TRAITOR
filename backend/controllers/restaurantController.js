const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const Meal = require('../models/meal');
const {HTTPRes,HTTPError, checkValidity} = require('../error');
const dbf = require('../databaseFunction');
const UserClient = require('../models/userClient');
const UserRestaurant = require('../models/userRestaurant');
const mongoose = require('mongoose');

exports.getRestaurantMeal = async (req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  for (let index = 0; index < restaurant.categories.length; index++) {
    console.log(restaurant.categories[index].mealList)
    await restaurant.populate({path: 'categories['+index+'].mealList', model: "Meal"}).execPopulate();
    
  }
  let restaurant2 = restaurant.toObject();
  delete restaurant2.orders;
  await restaurant.populate('categories').execPopulate();
  return new HTTPRes(200, restaurant2);
};



exports.addMeal = async (req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  let categorie = dbf.findSubDocument(restaurant.categories,req.params.categorieId);

  let meal = new Meal({
    ...req.body,
    _id: mongoose.Types.ObjectId(),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  categorie.mealList.push(meal._id);
  dbf.saveDocument(restaurant);
  dbf.saveDocument(meal);
  return new HTTPRes(201,"Meal added");
};

exports.deleteMeal = async(req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  let categorie = dbf.findSubDocument(restaurant.categories,req.params.categorieId);
  let meal = await dbf.findDocumentById(Meal,req.body.mealId);
  
  await dbf.removeFindSubDocument(categorie,"mealList",meal.id)
  await dbf.removeImage(meal.imageUrl);
  await dbf.removeDocument(meal);
  
  return new HTTPRes(200,"Meal removed");
};

exports.addCategorie = async (req, res, next) => {
  let categorie = req.body
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  restaurant.categories.push(categorie)
  await dbf.saveDocument(restaurant)
  return new HTTPRes(201,"Categorie added");
};

exports.deleteCategorie = async (req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  let categorie = dbf.findSubDocument(restaurant.categories,req.body.categorieId);
  await deleteCategorieFunction(categorie);
  return new HTTPRes(200,"Categorie removed");
};
async function deleteCategorieFunction (categorie){
  for (const mealId of categorie.mealList) {
    let meal = await dbf.findDocumentById(Meal,mealId);
    await dbf.removeDocument(meal);
  }
  await dbf.removeSubDocument(categorie);
}
exports.createRestaurant = async (req, res, next) => {
  let restaurant = new Restaurant({
      ...req.body,
      bannerUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  await dbf.saveDocument(restaurant);
  return new HTTPRes(201,"Restaurant created !"); 
};

exports.deleteRestaurant = async(req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.body.restaurantId);
  for (const categorie of restaurant.categories) {
    await deleteCategorieFunction(categorie);
  }
  await dbf.removeImage(restaurant.bannerUrl)
  await dbf.removeDocument(restaurant);
  return new HTTPRes(200,"Restaurant removed");
};

exports.addOrder = async (req, res, next) => {
  let orderObject =  req.body
//  if (orderObject.userId != req.body.userId) throw new HTTPError(400,"order must be from you")
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  let total = 0
  for (const mealID of orderObject.mealList){
    dbf.mealExits(restaurant.categories, mealID)
    let meal = await dbf.findDocumentById(Meal, mealID);
    total += meal.price
  }
  let currentDate = new Date()
  currentDate.setDate( currentDate.getDate()+1)
  let order = new Order({
    ...orderObject,
    total,
    restaurantName: restaurant.name,
    comeToPick: currentDate.toString(),
    clientId: req.body.userId,
    _id: mongoose.Types.ObjectId()
  });

  let client = await dbf.findDocumentById(UserClient, req.body.userId);
  
  restaurant.orders.push(order._id)
  client.orders.push(order._id);
  

  await dbf.saveDocument(restaurant)
  await dbf.saveDocument(client);
  await dbf.saveDocument(order);
  return new HTTPRes(201,"Order added");
};

exports.removeOrder = async(req, res, next) => {
//  checkValidity(req,["orderId"]);

  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);
  let order = await dbf.findDocumentById(Order, req.body.orderId);
  if (order.clientId != req.body.userId) throw new HTTPError(400,"you can delete only your order")
  let client = await dbf.findDocumentById(UserClient, req.body.userId);

  await dbf.removeFindSubDocument(client,"orders",order.id);
  await dbf.removeFindSubDocument(restaurant, "orders",order.id);

  await dbf.removeDocument(order);
  return new HTTPRes(200,"Order removed");
  }

exports.getOrders = async (req, res, next) => {
  let restaurant = await dbf.findDocumentById(Restaurant, req.params.restaurantId);

  await restaurant.populate({
    path: 'orders',
   
    populate: { 
      path: 'mealList',
    }
  }).execPopulate();
  return new HTTPRes(200, restaurant.toObject().orders);
};