const express = require('express');
const customerRouter = express.Router();
const checkAuth = require('../../middleware/verification').checkToken;
const ordermodel = require('../../models/order.model');
const OrderController = require('../../controller/order.controller');

const CustomerController = require('../../controller/customer.controller');

// GET all customer
customerRouter.get('/', checkAuth, CustomerController.getUsers);

customerRouter.post('/register', CustomerController.register);


// GET
customerRouter.get('/suppliersList', CustomerController.getSuppliersList)

// UDPATE a customer
customerRouter.patch('/:_id', checkAuth, CustomerController.updateUser);

// POST a new customer

// POST api/users/login
customerRouter.post("/login",  CustomerController.login);

//Delete all customers
customerRouter.delete('/', CustomerController.deleteAll);

//place order
customerRouter.post('/order/addOrder', checkAuth, new OrderController(ordermodel).addOrder);

// GER a customer
customerRouter.get('/:_id', checkAuth, CustomerController.getUser);

module.exports = customerRouter;