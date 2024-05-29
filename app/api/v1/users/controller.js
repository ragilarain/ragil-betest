const { StatusCodes } = require('http-status-codes');
const { getUsersServices, createUserServices, updateUserServices, getOneUserServices, deleteUserServices, destroyUserServices } = require('../../../services/mongoose/users')

const getUsers = async(req,res,next) => {
    try {
        const result = await getUsersServices();
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const createUser = async(req,res,next) => {
    try {
        const result = await createUserServices(req);
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const updateUser = async(req,res,next) => {
    try {
        const result = await updateUserServices(req);
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const getOneUser = async(req,res,next) => {
    try {
        const result = await getOneUserServices(req);
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const deleteUser = async(req,res,next) => {
    try {
        const result = await deleteUserServices(req);
        res.status(StatusCodes.OK).json({
            message: 'User has been deleted',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const destroyUser = async(req,res,next) => {
    try {
        const result = await destroyUserServices(req);
        res.status(StatusCodes.OK).json({
            message: 'User has been deleted permanently',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    getOneUser,
    deleteUser,
    destroyUser
}