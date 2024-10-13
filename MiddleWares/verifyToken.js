const { verify } = require("jsonwebtoken");
const { verifyJsonToken } = require("../Utils/Auth");

async function VerifyTokenMidd(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const verifyToken = verifyJsonToken(token);
                if (verifyToken) {
                    next()
                } else {
                    res.status(401).send({ message: "UnAuthenticated User" });
                }
            } catch (err) {
                res.status(401).send({ message: "UnAuthenticated User" });
            }

        }
        else {
            res.status(401).send({ message: "UnAuthenticated User" });
        }
    } else {
        res.status(401).send({ message: "UnAuthenticated User" });
    }
}

module.exports = VerifyTokenMidd