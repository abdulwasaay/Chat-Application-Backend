function GenerateExpiryDate (timeStamp) {
    return new Date((Date.now()+timeStamp));
}

module.exports = GenerateExpiryDate