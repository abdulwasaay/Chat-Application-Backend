require('dotenv').config({ path: "./Config/.env" })

const org = process.env.ORIGIN;
const corsOptions = {
    origin: org,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,   
};

module.exports = corsOptions