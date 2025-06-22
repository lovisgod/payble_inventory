const { filterParams } = require('../handlers/filterParams');
const inventoryService = require('../services/inventoryService');

const inventoryController  = {


    getInventory: async (req, res) => {
        try {
            const items = await inventoryService.fetchInventoryItems();
            res.status(200).json({status: 'success', items });
        } catch (error) {
            res.status(400).json({status: 'error', message: error.message });
        }
    }, 
    
    addInventory: async (req, res) => {
        try {
            const item = req.body;
            const newItem = await inventoryService.createInventoryItem(item);
            res.status(201).json({status: 'success', message: 'Item added successfully', item: newItem});
        } catch (error) {
            console.log('Error adding inventory item:', error);
            res.status(500).json({status: 'error', message: error.message });
        }
    },
    
    getInventoryItemsByUser: async (req, res) => {
        try {
            const userId = req.query.userId;
            const items = await inventoryService.getInventoryItemsByUser(userId);
            if (!items || items.length === 0) {
                return res.status(404).json({ message: 'No inventory items found for this user.' });
            }
            res.status(200).json({status: 'success', items });
        } catch (error) {
            res.status(400).json({status: 'error', message: error.message });
        }
    },
    
    searchInventory: async (req, res)  => {
        try {
            const userId = req.query.userId;
            const { category_id, name, sku } = req.query;
            const filters = filterParams({ category_id, name, sku });
            console.log('Filters:', filters);
            const items = await inventoryService.searchInventory(userId, filters);
            if (!items || items.length === 0) {
                return res.status(404).json({status: 'Error', message: 'No inventory items found for this user.' });
            }
            res.status(200).json({status: 'success', items });
        } catch (error) {
            res.status(400).json({status: 'error', message: error.message });
        }
    },
    
    updateInventory: async (req, res) => {
        try {
            const id = req.params.id;
            const { userId } = req.query;
            const updates = req.body;
            const updatedItem = await inventoryService.modifyInventoryItem(id, updates, userId);
            res.status(200).json({status: 'success', message: 'Item updated successfully', item: updatedItem});
        } catch (error) {
            res.status(400).json({status: 'error', message: error.message });
        }
    },
    
    deleteInventory: async (req, res) => {
        try {
            const id = req.params.id;
            const { userId } = req.query;
            const deletedItem = await inventoryService.removeInventoryItem(id, userId);
            res.status(200).json({status: 'success', message: 'Item deleted successfully', item: deletedItem});
        } catch (error) {
            res.status(400).json({status: 'error', message: error.message });
        }
    },

    getProductCategories: async (req, res) => {
        try {
            const categories = await inventoryService.fetchProductCategories();
            res.status(200).json({ status: 'success', data: categories });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },
}

module.exports = {
   inventoryController
};