import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";

const app = express();

/** Middlewares **/
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.get("*", (req, res,next) => {
  next();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
