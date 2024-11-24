import { createOrder } from "./db.js";
import {createAdminApiClient} from "@shopify/admin-api-client"

function orderCreated(req,res) {
  const data=req.body;
  const shopDomain = req.headers['x-shopify-shop-domain'];
  const orderId = data.id;
  const orderEmail = data.contact_email;
  const billing_details = data.billing_address;
  const shipping_address = data.shipping_address;
  const fullData = {};

  fullData.platform = "shopify"
  fullData.orderId = orderId;
  fullData.orderContactEmail = orderEmail;
  fullData.billing_details = {
    name: billing_details.name,
    phone: billing_details.phone,
    address1: billing_details.address1,
    address2: billing_details.address2,
    country: billing_details.country,
    province_code: billing_details.province_code,
    city: billing_details.city,
    zip: billing_details.zip
  }
  fullData.shipping_details = {
    name: shipping_address.name,
    phone: shipping_address.phone,
    address1: shipping_address.address1,
    address2: shipping_address.address2,
    country: shipping_address.country,
    province_code: shipping_address.province_code,
    city: shipping_address.city,
    zip: shipping_address.zip
  }
  fullData.list_items = data.line_items.map((e)=> {
    return {name: e.name, price: e.price, sku: e.sku}
  })
  fullData.total_price = data.total_price;
  console.log(fullData);
  try {
    createOrder({data: fullData, sd: shopDomain});
  }catch(e) {
    console.error(e);
  }
  res.status(201).json({msg:"DONE"});
}

export {orderCreated};
