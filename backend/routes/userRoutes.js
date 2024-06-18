const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

router.delete('/users/:userId', userController.deleteUser);

router.put('/users/:userId/listings', userController.updateUserListings);

router.put('/users/:userId/purchaseHistory', userController.updatePurchaseHistory);

router.post('/users/:userId/addListing', userController.addListingToUser);

router.post('/users/:userId/addPurchase', userController.addPurchaseToUser);

router.post('/users/login', userController.loginUser);

module.exports = router;
