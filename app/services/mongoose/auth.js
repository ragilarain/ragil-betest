const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require("../../error");
const {
    createJWT,
    createTokenUser,
} = require("../../utils");
const { USERS_FILL_LOGIN_WARNING, USERS_INVALID_LOGIN_WARNING, USERS_FAILED_LOGIN_WARNING, TRUE_VALUE, FALSE_VALUE } = require('../../globalVariable')

const signInService = async(req)=>{
    const { email, password } = req.body;

    if(!email || !password) {
        throw new BadRequestError(USERS_FILL_LOGIN_WARNING);
    }

    const result = await Users.findOne({emailAddress: email, isActive: TRUE_VALUE, isDeleted: FALSE_VALUE});

    if(!result) {
        throw new UnauthorizedError(USERS_INVALID_LOGIN_WARNING);
    }

    const isPasswordCorrect = await result.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthorizedError(USERS_FAILED_LOGIN_WARNING);
    }

    const token = createJWT({payload: createTokenUser(result)});

    return {token, email: result.emailAddress};
}

module.exports = {
    signInService
}