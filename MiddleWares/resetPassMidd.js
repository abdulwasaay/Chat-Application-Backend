const users = require("../Models/Users");

async function ResetPasswordMidd(req, res, next) {
    const { id } = req.body;
    try {
        const findById = await users.findById(id);
        if (!findById) {
            res.status(400).send({message:"User not found"})
        } else {
            next()
        }
    } catch (err) {
        res.status(501).send({message:"Something went wrong"})
    }
}

module.exports = ResetPasswordMidd