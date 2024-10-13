const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "Name Must be Required"] },
    email: { type: String, required: [true, "Email Must be Required"], unique: [true, "Email already exists"] },
    password: { type: String, required: [true, "Password Must be Required"], select: false },
    confirmPassword: { type: String, required: [true, "Password Must be Required"], select: false },
    status: {type: Boolean, required:true},
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const users = mongoose.model("Users", userSchema);

module.exports = users