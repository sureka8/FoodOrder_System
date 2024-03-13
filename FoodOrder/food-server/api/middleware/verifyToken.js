 //verify jwt token
  //middleware
  const jwt = require('jsonwebtoken');
  
  const verifyToken=(req,res,next) =>{
    // console.log(req.headers.authorization);
    if(!req.headers.authorization){
     return res.status(401).send({message:"authorized access"})
    };
    const token=req.headers.authorization.split(' ')[1];
    //console.log(token)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
     if(err){
       return res.status(401).send({message:"token in invalide"})
     };
     req.decode=decode;
     next()
    })
   }

   module.exports=verifyToken;