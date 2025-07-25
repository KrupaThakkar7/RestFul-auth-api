const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const { userLogin } = require('../controller/loginController');
const { validateResetPassword } = require('../utils/validateResetPswd');
const { resetPassword } = require('../controller/resetController');
const { fetchRefreshToken } = require('../controller/refreshToken');
const { googleAuth } = require('../controller/OAuth');
const { googleResponseHandler } = require('../controller/OAuth');
const verifyUser = require('../utils/verifyUser')

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', userRegistration);

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', userLogin);

/* Runs validateResetPassword first:
    If validation fails → it returns an error.
    If validation passes → calls resetPassword.*/
router.post('/reset-password', validateResetPassword, resetPassword);

router.post('/refresh-token', fetchRefreshToken);

router.get('/auth-google', googleAuth);

router.get('/auth/google/callback', googleResponseHandler);

router.get('/dashboard', verifyUser , (req,res) => {
    res.render('dashboard' , {user : req.user});
});




/*To access this pages , use URLS : "http://localhost:3000/register" or "http://localhost:3000/login" i.e. 
    1. http://localhost:3000 ---> server running on it
    2. '/' ---> form server.js where we mount userRouter(exported from userRouter.js) --->we have to use'/user' instead of '/' if we mention app.use('/user' , userRouter) ----> i.e. full url : "http://localhost:3000/user/register".
    3.'/register' ---> from userRouter 
*/
module.exports = router;
