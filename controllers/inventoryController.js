const inventoryService = require('../services/inventoryService');

async function getInventory(req, res) {
    try {
        const items = await inventoryService.fetchInventoryItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function addInventory(req, res) {
    try {
        const item = req.body;
        const newItem = await inventoryService.createInventoryItem(item);
        res.status(201).json(newItem);
    } catch (error) {
        console.log('Error adding inventory item:', error);
        res.status(500).json({ error: error.message });
    }
}

async function getInventoryItemsByUser(req, res) {
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
}

async function updateInventory(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedItem = await inventoryService.modifyInventoryItem(id, updates);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteInventory(req, res) {
    try {
        const id = req.params.id;
        const deletedItem = await inventoryService.removeInventoryItem(id);
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getInventory,
    addInventory,
    updateInventory,
    deleteInventory,
    getInventoryItemsByUser
};