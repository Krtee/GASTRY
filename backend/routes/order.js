const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const orderController = require('../controllers/order');

const authController = require('../controllers/auth');

const productsController = require('../controllers/product');

const createOrdersController = require('../controllers/order');


router.post(
    '/order/create/:userId', 
    authController.requireSignin, 
    authController.isAuth, 
    userController.addOrderToUserHistory, 
    productsController.decreaseQuantity,
    createOrdersController.createOrders)

router.get('/order/list/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.listOrders )

router.get('/order/status-values/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.getStatusValues )

router.put('/order/:orderId/status/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.updateOrderStatus)

router.param('userId', userController.userById);

router.param('orderId', orderController.orderById )

module.exports = router;