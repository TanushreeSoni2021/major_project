// we write like  " const express = require("express"); "  earlier but when use type : modeule in package.json then ----
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
//configure env
dotenv.config();
// if env file on other folder so use path like ---- dotenv.config(path:"");

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/auth', authRoutes)

//rest api
app.get("/", (req, resp) => {
  resp.send({
    message: "Welcom to ecommerce app",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
