const express = require('express');
const app = express();
const middleWares = require('./Middlewares.js')
const dbConnect = require('./Connection.js');
require('dotenv').config({ path: "./Config/.env" })
const cors = require('cors');
const corsOptions = require('./Config/corsConfig.js');
const { portENV, mongodbUrlENV } = require('./Config/env.js');

dbConnect(mongodbUrlENV)

app.use(cors(corsOptions))

app.use(
    "/api",
    middleWares
)

app.listen(portENV, () => {
    console.log(`Server is running on Port ${portENV}`)
})