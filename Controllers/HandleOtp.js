
const nodemailer = require('nodemailer');
const transportOptions = require('../Config/smtpTransport');
const otp = require("../Models/otp");

async function handleOtp(req, res) {
    const { otpEmail } = req;
    const { newOtp } = req.setOtp;
    const otpMessage = {
        from: "Chatly<wasaysaleem071@gmail.com>",
        to: otpEmail,
        subject: "Email Confirmation",
        text: `${newOtp}`,
    }
    let transporter = nodemailer.createTransport(transportOptions)
    transporter.sendMail(otpMessage, async(err) => {
        if (err) {
            try {
                await otp.deleteMany({ email: otpEmail});
                res.status(501).send({message:"OTP not sent"})

            } catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something Went wrong" })
            }

        } else {
            res.status(201).send({message:"OTP sent Successfully"})
        }
    })
}

module.exports = handleOtp