const { sign, verify } = require("jsonwebtoken")

const SetJsonToken = (userPayload, expDate) => {
    let secretKey = process.env.SECRET_KEY;

    return sign(userPayload, secretKey, { expiresIn: expDate })
}

const verifyJsonToken = (jwtToken) => {
    let secretKey = process.env.SECRET_KEY;

    return verify(jwtToken, secretKey)
}

module.exports = {
    SetJsonToken,
    verifyJsonToken
}