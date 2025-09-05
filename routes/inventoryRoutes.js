const express = require('express');
const { inventoryController } = require('../controllers/inventoryController');
const validateToken = require('../handlers/validateToken');
const { TillSalesController } = require('../controllers/tillSalesController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Inventory
 *     description: Inventory management endpoints
 *   - name: Sales
 *     description: Till sales management endpoints
 *   - name: Discounts
 *     description: Discount management endpoints
 */

/**
 * @swagger
 * /api/v2/inventory/items:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Successfully retrieved inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/items', inventoryController.getInventory);
/**
 * @swagger
 * /api/v2/inventory/item:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cost_price
 *               - selling_price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Item name
 *               color:
 *                 type: string
 *                 description: Item color
 *               cost_price:
 *                 type: number
 *                 description: Cost price
 *               selling_price:
 *                 type: number
 *                 description: Selling price
 *               in_stock:
 *                 type: boolean
 *                 description: Stock availability
 *               barcode:
 *                 type: string
 *                 description: Item barcode
 *               sku:
 *                 type: string
 *                 description: Stock keeping unit
 *               pricing_unit:
 *                 type: string
 *                 description: Pricing unit
 *     responses:
 *       201:
 *         description: Item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Item added successfully
 *                 item:
 *                   $ref: '#/components/schemas/InventoryItem'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/item', inventoryController.addInventory);
/**
 * @swagger
 * /api/v2/inventory/item:
 *   get:
 *     summary: Get inventory items by user
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to filter inventory items
 *     responses:
 *       200:
 *         description: Successfully retrieved user inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/item', inventoryController.getInventoryItemsByUser);
/**
 * @swagger
 * /api/v2/inventory/item/search:
 *   get:
 *     summary: Search inventory items with filters
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: Category ID filter
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Item name filter
 *       - in: query
 *         name: sku
 *         schema:
 *           type: string
 *         description: SKU filter
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: No items found
 *       400:
 *         description: Bad request
 */
router.get('/item/search', inventoryController.searchInventory);
/**
 * @swagger
 * /api/v2/inventory/{id}:
 *   put:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item ID
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *               cost_price:
 *                 type: number
 *               selling_price:
 *                 type: number
 *               in_stock:
 *                 type: boolean
 *               barcode:
 *                 type: string
 *               sku:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/:id', inventoryController.updateInventory);
/**
 * @swagger
 * /api/v2/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item ID
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('/:id', inventoryController.deleteInventory);
/**
 * @swagger
 * /api/v2/inventory/categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *       400:
 *         description: Bad request
 */
router.get('/categories', inventoryController.getProductCategories);
/**
 * @swagger
 * /api/v2/inventory/discount:
 *   post:
 *     summary: Add a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User ID
 *               type:
 *                 type: string
 *                 description: Discount type
 *               value:
 *                 type: number
 *                 description: Discount value
 *               description:
 *                 type: string
 *                 description: Discount description
 *     responses:
 *       200:
 *         description: Discount added successfully
 *       400:
 *         description: Invalid discount data
 *       500:
 *         description: Server error
 */
router.post('/discount', inventoryController.addDiscount);
/**
 * @swagger
 * /api/v2/inventory/discounts:
 *   get:
 *     summary: Get user discounts
 *     tags: [Discounts]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 discounts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Discount'
 *       400:
 *         description: Bad request
 */
router.get('/discounts', inventoryController.getUserDiscounts);
/**
 * @swagger
 * /api/v2/inventory/discount/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Discount ID
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('/discount/:id', inventoryController.deleteDiscount);
/**
 * @swagger
 * /api/v2/inventory/sales:
 *   get:
 *     summary: Get all till sales
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved sales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TillSale'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/sales', validateToken, TillSalesController.getTillSales);
/**
 * @swagger
 * /api/v2/inventory/sales/user:
 *   get:
 *     summary: Get till sales by user
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user sales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TillSale'
 *       400:
 *         description: Bad request - User ID is required
 *       401:
 *         description: Unauthorized
 */
router.get('/sales/user', validateToken, TillSalesController.getTillSalesByUser);
/**
 * @swagger
 * /api/v2/inventory/sales:
 *   post:
 *     summary: Add a new till sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TillSale'
 *     responses:
 *       201:
 *         description: Sale added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Sale added successfully
 *                 sale:
 *                   $ref: '#/components/schemas/TillSale'
 *       400:
 *         description: Invalid sale data
 *       401:
 *         description: Unauthorized
 */
router.post('/sales', validateToken, TillSalesController.addTillSale);


module.exports = router;