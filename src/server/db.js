import mongoose from 'mongoose';
import { bigStorage } from './schema.js';
import { useClerk } from '@clerk/clerk-react';

const uri = "mongodb+srv://19Doors:Doors@doors.4pvth.mongodb.net/?retryWrites=true&w=majority&appName=Doors";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const storage = bigStorage;
async function startDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(e) {
    console.error("Error connecting db: "+e);
  }
}

async function getOrders(req,res) {
  const email = req.body.email;
  const db = await storage.findOne({email: email});
  res.status(201).json({data: db});
}
async function setTokens(req, res) {
  const data = req.body;
  const email = data.email;
  const db = await storage.findOne({email: email});
  if(db==null) {
    const tmp = new storage(data);
    await tmp.save();
    const payload = { statusCode:201, msg: "Email did not exist, created new data!" };
    res.status(201).json(payload);
  }else {
    await db.updateOne({email:email},data);
    const payload = { statusCode: 201, msg: "Thanks! Addition/Updation Done!!!"};
    res.status(201).json(payload);
  }
}

async function getProducts(req,res) {
    const email = req.body.email;
    const db = await storage.findOne({email: email});
    if(db == null || db.shopifyToken == null) {
      res.status(404).json({ statusCode: 404, msg: "Setup atleast one plugin to fetch data."})
    }else {
      res.status(201).json({products: db.products});
    }
}

async function addProducts(req,res) {
  const pr = req.body.product;
  const db = await storage.updateOne({email:req.body.email},{products:pr});
  res.status(201).json({msg:"COMPLETED"});
}

async function getShopifyToken(){
}

async function createOrder(data) {
  try {
    const db = await storage.findOne({domain:data.sd});
    await storage.updateOne({domain: data.sd},{ 
        $push: { 
          orders: data.data
        } 
      });
  }catch(e) {
    console.error(e);
  }
}

export {startDB, setTokens, getOrders, getProducts, addProducts, createOrder};
