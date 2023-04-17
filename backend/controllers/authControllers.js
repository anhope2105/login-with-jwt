
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config()
let refreshTokens = []
const authControllers = {
   
    registerUser: async(req,res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password , salt);

            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password:hashed
            })
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (err) {
            res.status(404).json(err)
            console.log(err)
        }
    },
    //Generate access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id:user.id,
            admin:user.admin
        },process.env.JWT_ACCESS_TOKEN,{
            expiresIn: "20s"
        })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            id:user.id,
            admin:user.admin
        },process.env.JWT_REFRESH_TOKEN,{
            expiresIn:"365d"
        })
    },

    //LOGIN
    loginUser: async(req,res) => {
        try {
            const user = await User.findOne({username:req.body.username});
            if(!user) {
                res.status(404).json("Wrong username")
            }
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(!validPassword) {
                res.status(404).json("Wrong password")
            }
            if(user && validPassword) {
                const accessToken = authControllers.generateAccessToken(user)
                const refreshToken = authControllers.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie('refreshtoken',refreshToken , {
                    httpOnly: true,
                    path: '/',
                    sameSite: "strict",
                    secure: false,
                })
                const {password , ...others} = user._doc
            res.status(200).json({...others , accessToken})
            }
        } catch (err) {
            res.status(500).json(err)  
        }
    },
    requestRefreshToken : async(req,res) => {
       const refreshToken= req.cookies.refreshtoken
        if(!refreshToken) {
            return res.status(403).json("you're not authenticated");
        }
        // if(!refreshTokens.includes(refreshToken)) {
        //     return res.status(402).json("token is not valid");
        // }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN,(err,user) => {
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshtoken" , {
                httpOnly: true,
                secure:false,
                path:'/',
                sameSite:'strict'
            });
            res.status(200).json({accessToken:newAccessToken})
        })


    },
    userLogout: async (req, res) => {
        res.clearCookie("refreshtoken");
        refreshTokens= refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("logout")
    }
}
module.exports = authControllers