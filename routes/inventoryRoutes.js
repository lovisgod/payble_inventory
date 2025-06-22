const express = require('express');
const { inventoryController } = require('../controllers/inventoryController');
const validateToken = require('../handlers/validateToken');

const router = express.Router();

router.get('/items', inventoryController.getInventory);
router.post('/item', inventoryController.addInventory);
router.get('/item', inventoryController.getInventoryItemsByUser);
router.get('/item/search', inventoryController.searchInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.get('/categories', inventoryController.getProductCategories);


module.exports = router;