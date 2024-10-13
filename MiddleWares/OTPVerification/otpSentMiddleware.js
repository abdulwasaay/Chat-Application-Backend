const otp = require("../../Models/otp");
const users = require("../../Models/Users");

const GenerateExpiryDate = require("../../Utils/GenerateExpiry");
const GenerateOTP = require("../../Utils/GenerateOtp");

async function CheckStatusMiddleware(req, res, next) {
    const { email } = req.query;
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

async function OtpCheckMiddleware(req, res, next) {
    const { otpEmail } = req;
    try {
        const findByEmail = await otp.findOne({ email: otpEmail });
        if (findByEmail && findByEmail?.expiresAt > new Date()) {
            res.status(400).send({ message: "OTP is already sent" })

        }
        else {
            try {
                await otp.deleteMany({ email: otpEmail });
                const newOtp = GenerateOTP();
                const expDate = GenerateExpiryDate(60 * 1000);
                req.setOtp = { newOtp, expDate };
                next()
            } catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something Went wrong" })
            }
        }
    } catch (err) {
        console.log(err)
    }
}


async function OtpAddMiddleware(req, res, next) {
    const { otpEmail } = req;
    const { newOtp, expDate } = req.setOtp;

    try {
        await otp.create({
            email: otpEmail,
            otp: newOtp,
            expiresAt: expDate
        })
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Something Went wrong" })
    }
}

module.exports = {
    CheckStatusMiddleware,
    OtpCheckMiddleware,
    OtpAddMiddleware
}