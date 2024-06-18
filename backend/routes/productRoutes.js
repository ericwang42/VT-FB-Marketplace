const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.delete('/products/:productId', productController.deleteProduct);
router.get('/products/:productId', productController.getProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/search', productController.getProductsByTitle);


module.exports = router;
