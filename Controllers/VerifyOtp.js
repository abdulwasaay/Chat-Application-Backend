const users = require("../Models/Users");
const otp = require("../Models/otp");

async function verifyOtp(req, res) {
    const { myOtp, findByEmail } = req.findOtp
    if (myOtp !== findByEmail?.otp) {
        res.status(400).send({ message: "Invalid OTP" });
    } else {
        try {
            const updatedUser = await users.findOneAndUpdate(
                { email: findByEmail?.email },
                { $set: { status: true } },
                { new: true }
            )
            if (updatedUser) {
                try {
                    await otp.deleteMany({ email: findByEmail?.email });
                    res.status(200).send({ message: "OTP Verified" })

                } catch (err) {
                    console.log(err)
                    res.status(500).send({ message: "Something Went wrong" })
                }
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Something Went wrong" })
        }
    }
}

module.exports = verifyOtp