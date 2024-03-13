const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()

//console.log(process.env.ACCESS_TOKEN_SECRET)

//midleware
app.use(cors());
app.use(express.json());

//mongodb configuration using mongoos

//sharmilan003
//leugZpkF2FoI5gR1

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-food-client.wodruda.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(
    console.log("mongo db connect succesfull")
  )
  .catch((error) => console.log("erro mongo db", error));


  //jwt authentication
  app.post('/jwt',async(req,res)=>{
    const user=req.body;
    const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:'1hr'
    });
    res.send({token})
  });

 
 


  //import routers here
  const menuRoutes=require('./api/routes/menuRoutes');
  const cartRoutes=require('./api/routes/cartRoutes');
  const userRoutes=require('./api/routes/userRoutes');
  app.use('/menu',menuRoutes);
  app.use('/carts',cartRoutes)
  app.use('/users',userRoutes)



app.get("/",(req, res) => {
 // res.send("Hello World!");

});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
