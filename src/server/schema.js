import mongoose from 'mongoose';
const {Schema} = mongoose;

const storage = new Schema({
  email: String,
  shopifyToken: String,
  products: [{name: String, sku: String, category: String, price: String, stock: String, status: String}],
})

const bigStorage = mongoose.model('bigStorage',storage);
export {bigStorage};
