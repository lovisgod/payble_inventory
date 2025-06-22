const { filterParams } = require('../handlers/filterParams');
const inventoryService = require('../services/inventoryService');

const inventoryController  = {


    getInventory: async (req, res) => {
        try {
            const items = await inventoryService.fetchInventoryItems();
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }, 
    
    addInventory: async (req, res) => {
        try {
            const item = req.body;
            const newItem = await inventoryService.createInventoryItem(item);
            res.status(201).json(newItem);
        } catch (error) {
            console.log('Error adding inventory item:', error);
            res.status(500).json({ error: error.message });
        }
    },
    
    getInventoryItemsByUser: async (req, res) => {
        try {
            const userId = req.query.userId;
            const items = await inventoryService.getInventoryItemsByUser(userId);
            if (!items || items.length === 0) {
                return res.status(404).json({ message: 'No inventory items found for this user.' });
            }
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
                return res.status(404).json({ message: 'No inventory items found for this user.' });
            }
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
    updateInventory: async (req, res) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const updatedItem = await inventoryService.modifyInventoryItem(id, updates);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
    deleteInventory: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedItem = await inventoryService.removeInventoryItem(id);
            res.status(200).json(deletedItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
   inventoryController
};