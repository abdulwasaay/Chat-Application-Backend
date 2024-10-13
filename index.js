const express = require('express');
const app = express();
const middleWares = require('./Middlewares.js')
const dbConnect = require('./Connection');
require('dotenv').config({ path: "./Config/.env" })
const cors = require('cors');
const corsOptions = require('./Config/corsConfig');
const port =  process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;

dbConnect(mongodbUrl)

app.use(cors(corsOptions))

app.use(
    "/api",
    middleWares
)

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})