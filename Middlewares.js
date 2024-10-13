const express = require('express');
const signupRouter = require('./Routes/Signup');
const bodyParser = require('body-parser');
const { AuthMiddleware, CheckStatusLogMiddleware } = require('./MiddleWares/authMiddleWare');
const loginRouter = require('./Routes/Login');
const hashPassMiddleware = require('./MiddleWares/passwordHashMiddleware');
const { ForgotPasswordMidd, tokenMiddleware } = require('./MiddleWares/forgotPassMiddleware');
const forgotRouter = require('./Routes/Forgot');
const { CheckStatusMiddleware, OtpCheckMiddleware, OtpAddMiddleware } = require('./MiddleWares/OTPVerification/otpSentMiddleware');
const otpRouter = require('./Routes/Otp');
const { OtpVerifiedMiddleware, CheckStatusVerifiedMiddleware } = require('./MiddleWares/OTPVerification/otpVerificationMiddleware');
const verifyOtpRouter = require('./Routes/VerifyOtp');
const ResetPasswordMidd = require('./MiddleWares/resetPassMidd');
const VerifyTokenMidd = require('./MiddleWares/verifyToken');
const resetRouter = require('./Routes/Reset');


const middleWares = express();

middleWares.use(bodyParser.urlencoded({ extended: false }))
middleWares.use(bodyParser.json())
middleWares.use(express.json())


middleWares.use("/auth/signup", hashPassMiddleware, signupRouter)

middleWares.use("/auth/login", AuthMiddleware, CheckStatusLogMiddleware, loginRouter)

middleWares.use("/auth/forgot", ForgotPasswordMidd, tokenMiddleware, forgotRouter)

middleWares.use("/auth/getotp", CheckStatusMiddleware, OtpCheckMiddleware, OtpAddMiddleware, otpRouter)

middleWares.use("/auth/verifyotp", CheckStatusVerifiedMiddleware, OtpVerifiedMiddleware, verifyOtpRouter)

middleWares.use("/auth/reset-password", ResetPasswordMidd, VerifyTokenMidd, hashPassMiddleware, resetRouter)

module.exports = middleWares