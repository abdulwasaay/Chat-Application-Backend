const users = require("../Models/Users");

async function ResetPassword(req, res) {
    const { id } = req.body;
    const { hashPass } = req;

    try {
        const updatedUser = await users.findByIdAndUpdate(
            id,
            { password: hashPass },
            { confirmPassword: hashPass },
            { new: true }
        )
        if (updatedUser) {
            res.status(200).send({ message: "Password changed" });
        } else {
            res.status(500).send({ message: "Password not changed" });
        }
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }

}

module.exports = ResetPassword