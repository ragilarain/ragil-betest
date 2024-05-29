const createTokenUser = (user) => {
    return {
        userName: user.userName,
        emailAddress: user.emailAddress,
        accountNumber: user.accountNumber,
        identityNumber: user.identityNumber
    };
};

module.exports = {
    createTokenUser
}