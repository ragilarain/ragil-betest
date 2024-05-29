const { UnauthenticatedError, UnauthorizedError} = require('../error');
const { USERS_AUTH_INVALID_LOGIN_WARNING } = require('../globalVariable');
const { isTokenValid } = require('../utils/jwt');

const authenticatedUser = async (req, res, next) => {
    try {
        let token;

        // check header 
        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        };

        if(!token) {
            throw new UnauthenticatedError(USERS_AUTH_INVALID_LOGIN_WARNING);
        };

        const payload = isTokenValid({ token });

        req.user = {
            userName: payload.userName,
            emailAddress: payload.emailAddress,
            accountNumber: payload.accountNumber,
            identityNumber: payload.identityNumber
        };

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticatedUser
}