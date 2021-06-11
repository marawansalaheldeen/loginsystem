const {
    createUser,
    getAllUsers,
    findUserById,
    removingUser,
    updateUserById,
    login } = require('./controller');

const express = require('express');
const {checkToken}=require('../auth/tokenvalidation');
const router = express.Router();

router.post('/createuser',createUser);
/* router.get('/',checkToken,getAllUsers);
router.get('/user/:id',checkToken,findUserById);
router.delete('/user/:id',checkToken,removingUser);
router.patch('/user/:id',checkToken,updateUserById); */
router.post('/user/login',login);

module.exports = router;

