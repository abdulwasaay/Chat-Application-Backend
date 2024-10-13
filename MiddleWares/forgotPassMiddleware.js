const users = require("../Models/Users");
const { SetJsonToken } = require("../Utils/Auth");
const path = require('path')
const fs = require('fs');

async function ForgotPasswordMidd(req, res, next) {
    const { email } = req.body;
    try {
        const findByEmail = await users.findOne({email})
        if (!findByEmail) {
            res.status(400).send({message:"User not found"})
        } else {
            req.forgotUser = findByEmail;
            next()
        }
    } catch (err) {
        res.status(501).send({message:"Something went wrong"})
    }
}

async function tokenMiddleware(req, res, next) {
    const { forgotUser } = req;
    const userPayload = {
        user_id: forgotUser?._id,
        name: forgotUser?.fullName,
        email: forgotUser?.email,
    }
    const rootPath = path.join(process.cwd(), "views", "forgotPass.html");

    try {
        const token = SetJsonToken(userPayload , 120);
        if (token) {
            fs.readFile(rootPath, "utf8", (err, data) => {
                if (!err) {
                    let modifiedHtml = data.replace(':userId', forgotUser?._id);
                    modifiedHtml = modifiedHtml.replace(':jwtToken', token)
                    req.updatedHtml = modifiedHtml
                    next()
                } else {
                    res.status(500).send({message:"Something went wrong"})
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({message:"Something went wrong"})
    }
}

module.exports = {
    ForgotPasswordMidd,
    tokenMiddleware
}