const express = require('express');
const verifyOtp = require('../Controllers/VerifyOtp');
const verifyOtpRouter = express.Router();

verifyOtpRouter.put("/", verifyOtp)

module.exports = verifyOtpRouter