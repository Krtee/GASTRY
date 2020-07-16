const express = require('express');
const userRouter = express.Router();
const userModel = require('../../models/user.model')
const UserController = require('../../controller/user.controller');
const checkAuth = require('../../middleware/verification').checkToken;
const ordermodel = require('../../models/order.model');
const OrderController = require('../../controller/order.controller');

userRouter.post("/login",  new UserController(userModel).login);
userRouter.get('/checkToken', checkAuth, new UserController(userModel).checkTokenValidity);


//get orderlist
userRouter.get('/home/', checkAuth, new OrderController(ordermodel).fetchOrders);


//get specific Order
userRouter.get('/home/:_id', checkAuth, new OrderController(ordermodel).getOrder);


// UPDATE a user
userRouter.patch('/:_id', checkAuth, new UserController(userModel).updateUser);

//delete Order
userRouter.post('/home/delete/:_id', checkAuth, new OrderController(ordermodel).deleteOrder);

userRouter.get('/:_id', checkAuth, new UserController(userModel).getUser);


module.exports = userRouter;