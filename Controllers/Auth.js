const cookieConfig = require('../Config/CookieConfig');
const users = require('../Models/Users');
const { SetJsonToken } = require('../Utils/Auth');

async function handleUserSignUp(req, res) {
    const { fullName, email } = req.body;
    const { hashPass } = req;
    try {
        await users.create({
            fullName,
            email,
            password: hashPass,
            confirmPassword: hashPass,
            status: false,
        })
        res.status(301).send({ email })

    } catch (err) {
        console.log(err)
        if (err.errorResponse && err.errorResponse.code && err.errorResponse.code === 11000) {
            res.status(400).send({ message: "User already exists" })
        } else {
            res.status(500).send({ message: "Something went wrong" })
        }
    }
}

async function handleUserLogin(req, res) {
    const user = req.userData;
    const userPayload = {
        user_id: user?._id,
        name: user?.fullName,
        email: user?.email,
    }
    try {
        const token = SetJsonToken(userPayload, '720h');

        if (token) {
            res.cookie("token" , token , cookieConfig)
            return res.status(200).send(userPayload)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Something went wrong" })
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}