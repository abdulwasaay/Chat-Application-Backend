
export const encryptPassword = async(password , hash) => {
    return await hash(password , 10)
}

export const decryptPassword = async(password , compare , hash) => {
    return await compare(password , hash)
}
