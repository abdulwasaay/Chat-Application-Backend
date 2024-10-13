const { hash } = require('bcryptjs');
const { encryptPassword } = require('../Utils/passwordHash');

const hashPassMiddleware = async (req, res, next) => {
    const { password } = req.body;
    try {
        const hashPassword = await encryptPassword(password, hash);
        req.hashPass = hashPassword
        next()
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Something went wrong" })
    }

}

module.exports = hashPassMiddleware