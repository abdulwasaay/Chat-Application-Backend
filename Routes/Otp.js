const express = require('express');
const handleOtp = require('../Controllers/HandleOtp');
const otpRouter = express.Router();

otpRouter.get("/", handleOtp)

module.exports = otpRouter