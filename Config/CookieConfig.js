require('dotenv').config({ path: "./Config/.env" })

const cookieConfig = {
    maxAge: 2592000000,
    secure: true,
    sameSite: 'none',
    domain: process.env.ORIGIN,
    path: '/', 
}

module.exports = cookieConfig