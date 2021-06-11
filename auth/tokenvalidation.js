const jwt = require('jsonwebtoken');

const checkToken =(req,res,next)=>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token,"qwu12345",(err,decoded)=>{
                if(err){
                    res.send("Invalid Token");
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
        }else{
            res.status(500).send("Access denied");
        }
        
}

module.exports = {
    checkToken
}
