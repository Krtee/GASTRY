const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const categoryController = require('../controllers/category');

const authController = require('../controllers/auth');

router.post('/category/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin,  categoryController.createCategory);

router.get('/category/:categoryId', categoryController.readCategory);

router.put('/category/:categoryId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, categoryController.updateCategory);

router.delete('/category/:categoryId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, categoryController.deleteCategory);

router.get('/categories', categoryController.categoryList);



router.param('categoryId', categoryController.categoryById);

router.param('userId', userController.userById);

module.exports = router;
