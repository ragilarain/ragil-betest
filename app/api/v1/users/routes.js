const express = require('express')
const router = express();
const { getUsers, createUser, updateUser, getOneUser, deleteUser, destroyUser } = require('./controller')
const {authenticatedUser} = require('../../../middlewares/auth')

router.get('/users', authenticatedUser, getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/users/:accountNumber', getOneUser);
router.delete('/users/:id', deleteUser)
router.delete('/users-delete/:id', destroyUser)

module.exports = router;