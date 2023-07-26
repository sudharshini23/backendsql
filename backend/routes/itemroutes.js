const path = require('path');

const express = require('express');

const itemController = require('../controllers/item');

const router = express.Router();

router.get('/get-items', itemController.getItemDetails);

router.post('/add-item', itemController.postItemDetails);

router.put('/buy-item/:id',itemController.buyProducts);

module.exports = router;