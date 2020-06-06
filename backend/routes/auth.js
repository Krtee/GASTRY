const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

const { userSignupValidator } = require('../validator/index');


router.post('/signup', userSignupValidator, authController.userSignUp);

router.post('/login', authController.userLogin);

router.get('/signout', authController.userSignout);

router.get('/hello', authController.requireSignin, (req, res) => {
    res.send('Hello there')
})

module.exports = router;
