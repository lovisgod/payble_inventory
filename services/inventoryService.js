const inventoryRepository = require('../repositories/inventoryRepository');

async function fetchInventoryItems() {
    return await inventoryRepository.getInventoryItems();
}

async function createInventoryItem(item) {
    if (!item.name || !item.quantity) {
        throw new Error('Item name and quantity are required');
    }
    return await inventoryRepository.addInventoryItem(item);
}

async function getInventoryItemsByUser(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }
    return await inventoryRepository.getInventoryItemsByUser(userId);
}

async function modifyInventoryItem(id, updates) {
    if (!id || !updates) {
        throw new Error('Item ID and updates are required');
    }
    return await inventoryRepository.updateInventoryItem(id, updates);
}

async function removeInventoryItem(id) {
    if (!id) {
        throw new Error('Item ID is required');
    }
    return await inventoryRepository.deleteInventoryItem(id);
}

module.exports = {
    fetchInventoryItems,
    createInventoryItem,
    modifyInventoryItem,
    removeInventoryItem,
    getInventoryItemsByUser
};