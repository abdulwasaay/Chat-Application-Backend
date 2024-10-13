require('dotenv').config({ path: "./Config/.env" })

const cookieConfig = {
    maxAge: 2592000000,
    secure: process.env.ENV === "prod",
    sameSite: process.env.ENV === 'prod' ? 'none' : 'lax',
}

module.exports = cookieConfig