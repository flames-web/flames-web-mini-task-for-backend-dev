const mongoose = require('mongoose');
const Item = require('../models/item');
const {products} = require('./cart');
const {title,cool} = require('./item')

mongoose.connect('mongodb://localhost:27017/task');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', () => {
  console.log('Database Opened');
})

const sample = arr => arr[Math.random(Math.floor* 3 )+1];
const seedDB = async () => {
  await Item.deleteMany({});
  for(let i = 0; i < `${title.length}`; i++){
    const random1 = Math.floor(Math.random() * products.length);
     const random = Math.floor(Math.random() * 5000);
     const randomUnit = Math.floor(Math.random() * 500);
       const items = new Item({
        name : title[i],
        price : random,
        description:products[random1].description,
        unit:randomUnit,
     })
     await items.save();
  }
}


seedDB().then( () => {
    mongoose.connection.close()
  });