
const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: async (req, res, next) => {
           const token = req.headers.token;
            if(token) {
                const accessToken = token.split(" ")[1];
                jwt.verify(accessToken , process.env.JWT_ACCESS_TOKEN ,(err,user) => {
                    if(err) {
                        return res.status(403).json("token is not valid")
                    }
                        req.user = user;
                        console.log(req.user)
                        next();
                });
            }else {
                return res.status(401).json("you are not authenticated")
            }
        
        },
        verifyTokenAndAdminAuth: (req,res,next) => {
            middlewareController.verifyToken(req,res , () => {
                if(req.user.id === req.params.id || req.user.admin){
                    next();
                }else {
                   return res.status(403).json("You'are not allowed to deleted")
                }
            })

        }
}
module.exports = middlewareController