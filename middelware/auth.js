
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token)
    {
        return res.json({message:"please Login First"});
    }

    jwt.verify(token,"key", function(err,decoded){
        if(err)
        {
            return res.json({message:"please Login First"});
        }

        const userId=decoded.userId;
        req.userID=userId
        next();
    })
}

module.exports={auth}