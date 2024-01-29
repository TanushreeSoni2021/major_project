// we write like  " const express = require("express"); "  earlier but when use type : modeule in package.json then ----
import express from "express"
import dotenv from "dotenv"

//configure env 
dotenv.config();
// if env file on other folder so use path like ---- dotenv.config(path:"");

//rest object
const app = express();

//rest api
app.get("/", (req, resp) => {
    resp.send({
        message:"Welcom to ecommerce app"
    })
});

//PORT
const PORT = process.env.PORT ||8080 ;

//run listen
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})
