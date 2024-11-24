import mongoose from 'mongoose';
const {Schema} = mongoose;

const storage = new Schema({
  shopifyToken: String,
  email: String,
  products: [{name: String, sku: String, category: String, price: String, stock: String, status: String}],
  orders: [{platform: String, orderId: Number, orderContactEmail: String, billing_details: {name: String,phone: String, address1: String, address2: String, country: String, province_code: String, city: String, zip: String}, shipping_details: {name: String,phone: String, address1: String, address2: String, country: String, province_code: String, city: String, zip: String}, list_items:[{name:String,price:String,sku:String}], total_price: String}],
})

const bigStorage = mongoose.model('bigStorage',storage);
export {bigStorage};
