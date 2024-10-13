const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {  // Or you can use 'phone' if the OTP is being sent to a phone number
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const otps = mongoose.model("Otp", otpSchema);

module.exports = otps