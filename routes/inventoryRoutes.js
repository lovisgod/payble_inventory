const express = require('express');
const { inventoryController } = require('../controllers/inventoryController');
const validateToken = require('../handlers/validateToken');
const { TillSalesController } = require('../controllers/tillSalesController');

const router = express.Router();

router.get('/items', inventoryController.getInventory);
router.post('/item', inventoryController.addInventory);
router.get('/item', inventoryController.getInventoryItemsByUser);
router.get('/item/search', inventoryController.searchInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.get('/categories', inventoryController.getProductCategories);
router.post('/discount', inventoryController.addDiscount);
router.get('/discounts', inventoryController.getUserDiscounts);
router.delete('/discount/:id', inventoryController.deleteDiscount);
router.get('/sales', validateToken, TillSalesController.getTillSales);
router.get('/sales/user', validateToken, TillSalesController.getTillSalesByUser);
router.post('/sales', validateToken, TillSalesController.addTillSale);


module.exports = router;