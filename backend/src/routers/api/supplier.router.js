const express = require('express');
const supplierRouter = express.Router();
const checkAuth = require('../../middleware/verification').checkToken;

const SupplierController = require('../../controller/supplier.controller');
const ordermodel = require('../../models/order.model');
const OrderController = require('../../controller/order.controller');
// GET all Supplier
supplierRouter.get('/', checkAuth, SupplierController.getUsers);

supplierRouter.post('/register', SupplierController.register);



supplierRouter.get('/fetchCatalog', checkAuth, SupplierController.fetchCatalog);

// TODO Maybe replace fetchCatalog with getCatalog
// and make this method accessible even without a token?
// GET supplier's catalog
supplierRouter.get('/catalog/:_id', SupplierController.getCatalog)

// GER a customer
supplierRouter.get('/:_id', checkAuth, SupplierController.getUser);

// UPDATE a customer
supplierRouter.patch('/:_id', checkAuth, SupplierController.updateUser);

supplierRouter.patch('/home/:_id',checkAuth,new OrderController(ordermodel).modifyOrder)

// POST a new customer

// POST api/users/login
supplierRouter.post("/login",  SupplierController.login);

//Delete all customers
supplierRouter.delete('/', SupplierController.deleteAll);



supplierRouter.put('/addItem', checkAuth, SupplierController.addItem);

supplierRouter.put('/deleteItem', checkAuth, SupplierController.deleteItem);

supplierRouter.put('/modifyItem', checkAuth, SupplierController.modifyItem);

module.exports = supplierRouter;
