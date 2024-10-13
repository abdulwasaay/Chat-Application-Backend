const otp = require("../../Models/otp");
const users = require("../../Models/Users");

async function CheckStatusVerifiedMiddleware(req, res, next) {
    const { email } = req.body;
    try {
        const findByEmail = await users.findOne({ email });
        if (!findByEmail) {
            res.status(400).send({ message: "User not Found" })
        }
        else if (findByEmail?.status) {
            res.status(400).send({ message: "User is already verified" })
        }
        else {
            req.otpEmail = email
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

async function OtpVerifiedMiddleware(req, res, next) {
    const { otP } = req.body;
    const { otpEmail } = req;

    try {
        const findByEmail = await otp.findOne({ email: otpEmail });
        if (!findByEmail) {
            res.status(400).send({ message: "Invalid OTP" })
        }
        else if (findByEmail && findByEmail?.expiresAt <= new Date()) {
            try {
                await otp.deleteMany({ email: otpEmail });
                res.status(400).send({ message: "Invalid OTP" })
            } catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something Went wrong" })
            }

        }
        else {
            const myOtp = `${otP}`
            req.findOtp = { myOtp, findByEmail }
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CheckStatusVerifiedMiddleware,
    OtpVerifiedMiddleware,
}