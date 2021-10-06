const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var methodOverride = require('method-override')
const app = express();

mongoose.connect("mongodb://foodtraitordatabase:wQZoaj9PDzYiLTFFAubYZ45M84P3R9A8riQW1IJkH0xrhcWbrheUS4msC8GViAFOPEGLFj9pQOqZ4MCqgDpHcQ==@foodtraitordatabase.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@foodtraitordatabase@",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const stuffRoutes = require('./routes/stuffRoute');
const userRoutes = require('./routes/userRoute');
//const orderRoutes = require('./routes/order');

app.use('/api/restaurants', stuffRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/auth', userRoutes);
//app.use('/api/order', orderRoutes);

module.exports = app;