require('dotenv').config({ path: "./Config/.env" })

const password = process.env.PASSWORD;

const transportOptions = {
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: "wasaysaleem071@gmail.com",
    pass: password,
  }
}

module.exports =  transportOptions