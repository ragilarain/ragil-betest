const express = require('express')
const router = express();
const { getUsers, createUser, updateUser, getOneUser, deleteUser, destroyUser } = require('./controller')
const {authenticatedUser} = require('../../../middlewares/auth')
const {cacheMiddleware} = require('../../../middlewares/cache')

router.get('/users', authenticatedUser, getUsers);
router.post('/users', createUser);
router.put('/users/:id', authenticatedUser, updateUser);
router.get('/users/:accountNumber', authenticatedUser, getOneUser);
router.delete('/users/:id', authenticatedUser, deleteUser)
router.delete('/users-delete/:id', authenticatedUser, destroyUser)

module.exports = router;