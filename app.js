const express = require('express');
const app = express();
const middleWares = require('./Middlewares.js')
const dbConnect = require('./Connection.js');
require('dotenv').config({ path: "./Config/.env" })
const cors = require('cors');
const corsOptions = require('./Config/corsConfig.js');
const port =  process.env.PORT || 3000;
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