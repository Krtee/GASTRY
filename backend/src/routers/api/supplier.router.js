const express = require('express');
const supplierRouter = express.Router();
const checkAuth = require('../../middleware/verification').checkToken;

const SupplierController = require('../../controller/supplier.controller');

// GET all customer
supplierRouter.get('/', checkAuth, SupplierController.getAll);

supplierRouter.get('/fetchCatalog', checkAuth, SupplierController.fetchCatalog);

// GER a customer
supplierRouter.get('/:_id', checkAuth, SupplierController.getUser);

// UPDATE a customer
supplierRouter.patch('/:_id', checkAuth, SupplierController.updateUser);

// POST a new customer
supplierRouter.post('/register', SupplierController.register);

// POST api/users/login
supplierRouter.post("/login",  SupplierController.login);

//Delete all customers
supplierRouter.delete('/', SupplierController.deleteAll);



supplierRouter.put('/addItem', checkAuth, SupplierController.addItem);

supplierRouter.put('/deleteItem', checkAuth, SupplierController.deleteItem);

supplierRouter.put('/modifyItem', checkAuth, SupplierController.modifyItem);

module.exports = supplierRouter;
