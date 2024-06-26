const Users = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../error');
const { USERS_DUPLICATED, USERS_NOT_FOUND, FALSE_VALUE, TRUE_VALUE } = require("../../globalVariable");
const bcrypt = require('bcryptjs')
const CacheService = require('../../middlewares/cache')

const getUsersServices = async(req)=>{
    const result = Users.find({
        isDeleted: FALSE_VALUE,
        isActive: TRUE_VALUE
    });
    return result;
}

const createUserServices = async(req)=> {
    const { userName, emailAddress, accountNumber, identityNumber, password } = req.body;

    const isDuplicate = await Users.findOne({
        accountNumber,
        identityNumber
    })
    console.log(isDuplicate);
    if(isDuplicate) throw new BadRequestError(USERS_DUPLICATED);

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await Users.create({
        userName,
        password: passwordHash,
        emailAddress,
        accountNumber,
        identityNumber,
        isDeleted: FALSE_VALUE,
        isActive: TRUE_VALUE
    });
    return result;
}

const updateUserServices = async(req)=> {
    const { id } = req.params;
    const { userName, emailAddress, accountNumber, identityNumber } = req.body;

    const isDuplicate = await Users.findOne({
        accountNumber,
        identityNumber,
        _id: { $ne: id}
    })

    if(isDuplicate) throw new BadRequestError(USERS_DUPLICATED);

    const result = await Users.findOneAndUpdate(
        { _id: id },
        { userName, emailAddress, accountNumber, identityNumber },
        { new: true, runValidators: true }
    );

    if(!result) throw new NotFoundError(USERS_NOT_FOUND);

    return result;
}

const getOneUserServices = async(req)=> {
    const { accountNumber } = req.params;
    const cacheKey = `user:${accountNumber}`;

    const cachedUser = await CacheService.get(cacheKey);
    if (cachedUser) {
        console.log('RETURN HERE NIHH ', cachedUser);
        return cachedUser;
    }

    const result = await Users.findOne({
        accountNumber
    });

    if(!result) throw new NotFoundError(USERS_NOT_FOUND);

    await CacheService.set(cacheKey, result);

    return result;
}

const destroyUserServices = async (req) => {
    const { id } = req.params;
    const result = await Users.findOne({
        _id: id
    })

    const cacheKey = `user:${result.accountNumber}`;
    console.log(cacheKey);
    
    if(!result) throw new NotFoundError(USERS_NOT_FOUND);

    await CacheService.del(cacheKey);

    await result.deleteOne();

    return result;
}

const deleteUserServices = async (req)=> {
    const {id} = req.params;

    const isCheck = await Users.findOne({
        _id: { $ne: id}
    })
    console.log('CHECK FUCKING DELETE ',isCheck);
    if(!isCheck) throw new NotFoundError(USERS_NOT_FOUND);

    const result = await Users.findOneAndUpdate(
        { _id: id },
        { 
            isDeleted: TRUE_VALUE,
            isActive: FALSE_VALUE
        },
        { new: true, runValidators: true }
    );

    return result;
}

module.exports = {
    getUsersServices,
    createUserServices,
    updateUserServices,
    getOneUserServices,
    deleteUserServices,
    destroyUserServices
}