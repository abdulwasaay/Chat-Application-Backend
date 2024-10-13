
const nodemailer = require('nodemailer');
const transportOptions = require('../Config/smtpTransport');

async function ForgotPass(req, res) {
    const { updatedHtml, forgotUser } = req;
    const forgotEmailMessage = {
        from: "Chatly<wasaysaleem071@gmail.com>",
        to: forgotUser?.email,
        subject: "Forgot your password?",
        html: updatedHtml,
    }
    let transporter = nodemailer.createTransport(transportOptions)
    transporter.sendMail(forgotEmailMessage, (err) => {
        if (err) {
            res.status(501).send({message:"Email not sent Successfully"})
            console.log(err)
        } else {
            res.status(201).send({message:"Email sent Successfully"})
        }
    })
}

module.exports = ForgotPass