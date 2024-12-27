require('dotenv').config({ path: "./Config/.env" })

const portENV =  process.env.PORT || 3000;
const mongodbUrlENV = process.env.MONGODB_URL;

module.exports = {
    portENV,
    mongodbUrlENV
}