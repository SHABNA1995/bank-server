//used to validate tokens.. only middle ware can control the request in the server
//create middle ware
const jwt=require ('jsonwebtoken')
jwtmiddleware=(req, res, next)=> {
    //access token from request header
    try {
        const token = req.headers["accesstoken"] // here chance to runtime error bcz can't access tokens

        //validate token .....  to validate token using verify() method
        jwt.verify(token, "secretkey123")
        //if verified the token continue the request using next()
        next()
    }
    catch {
        res.status(404).json("please login")
    }
}
module.exports={jwtmiddleware}