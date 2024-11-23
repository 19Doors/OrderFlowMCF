import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import { addProducts, getProducts, setTokens, startDB } from "./db.js";


const app = express();

/** Middlewares **/
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

startDB();
app.get("*", (req, res,next) => {
  next();
});

// POST REQUESTS
app.post("/api/setShopifyToken",setTokens);
app.post("/api/getProducts", getProducts);
app.post("/api/addProducts", addProducts);


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
