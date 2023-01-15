const express = require('express');
const RegisterUser = require('../controllers/register');
const LoginUser = require("../controllers/login");
const ChangePassword = require('../controllers/changepass');
const CheckUserAuth = require('../middleware/authmiddleware');
const ResetPasswordSendEmail = require('../controllers/reset_Pass');
const SetNewPassword = require("../controllers/newpass")
const router = express.Router();


// Router middleware
router.use('/changepassword',CheckUserAuth);

// public route
router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/reset',ResetPasswordSendEmail);
router.post('/newpassword/:id/:token',SetNewPassword);
// protected route
router.post('/changepassword',ChangePassword)


module.exports = router;