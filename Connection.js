const mongoose = require('mongoose');

const dbConnection = async (url) => {
    try {
        await mongoose.connect(url)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = dbConnection