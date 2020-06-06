const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const authController = require('../controllers/auth');

router.get('/secret/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, (req, res) => {
    res.json({
       user: req.profile
    })
});

router.get('/user/:userId', authController.requireSignin, authController.isAuth, userController.read);

router.put('/user/:userId', authController.requireSignin, authController.isAuth, userController.update);

router.get('/orders/by/user/:userId', authController.requireSignin, authController.isAuth, userController.purchaseHistory);

router.param('userId', userController.userById);

module.exports = router;