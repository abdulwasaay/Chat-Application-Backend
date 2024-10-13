const users = require("../Models/Users");
const {compare} = require('bcryptjs');
const { decryptPassword } = require("../Utils/passwordHash");

async function AuthMiddleware(req, res, next) {
    const { email, password } = req.body;
    try {
        const findByEmail = await users.findOne({ email }).select("+password")
        if (!findByEmail) {
            res.status(400).send({ message: "User not Found" })
        } else {
            const hashPassword = await decryptPassword(password , compare , findByEmail?.password)
            if (!hashPassword) {
                res.status(400).send({ message: "Incorrect Password" })
            } else {
                req.userData = findByEmail
                next()
            }
        }
    } catch (err) {
        console.log(err)
    }
}

async function CheckStatusLogMiddleware(req, res, next) {
    const { email } = req.body;

    try {
        const findByEmail = await users.findOne({ email });
        if (!findByEmail?.status) {
            res.status(400).send({ message: "REDIRECT_TO_OTP" , email:findByEmail?.email })
        }
        else {
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    AuthMiddleware,
    CheckStatusLogMiddleware
}