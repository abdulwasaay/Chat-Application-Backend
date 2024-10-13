require('dotenv').config({ path: "./Config/.env" })

const cookieConfig = {
    maxAge: 2592000000,
    secure: true,
    sameSite: 'none',
    path: process.env.ORIGIN
}

module.exports = cookieConfig