const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const app = express();
dotenv.config()

mongoose.connect(process.env.MONGODB_URI , () => {
    console.log("connect db seccessfully")
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(8888 , () => {
    console.log("server running port 8888");
})

