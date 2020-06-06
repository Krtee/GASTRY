const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const authController = require('../controllers/auth');

const productController = require('../controllers/product');



router.post('/product/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.createProduct, (req, res) => {
    res.json({
       user: req.profile
    })
});

router.put('/product/:productId/:userId',  authController.requireSignin, authController.isAuth, authController.isAdmin, productController.updateProduct);

router.delete('/product/:productId/:userId',  authController.requireSignin, authController.isAuth, authController.isAdmin, productController.deleteProduct);

router.get('/products', productController.list);

router.get('/product/:productId', productController.readProduct);


router.get('/products/search', productController.listSearch);

router.get('/products/related/:productId', productController.listRelated);

router.get('/product/categories', productController.listCategories);

router.get('/product/photo/:productId', productController.photo);

router.post('/products/by/search', productController.listBySearch);

router.param('userId', userController.userById);

router.param('productId', productController.productById )

module.exports = router;