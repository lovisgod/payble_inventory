const inventoryRepository = require('../repositories/inventoryRepository');

async function fetchInventoryItems() {
    return await inventoryRepository.getInventoryItems();
}

async function createInventoryItem(item) {
    if (!item.name || !item.in_stock) {
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

async function searchInventory(userId, filters) {
    if (!userId) {
        throw new Error('User ID is required');
    }
    return await inventoryRepository.searchInventory(userId, filters);
}

async function modifyInventoryItem(id, updates, userId) {
    if (!id || !updates) {
        throw new Error('Item ID and updates are required');
    }
    return await inventoryRepository.updateInventoryItem(id, updates, userId);
}

async function removeInventoryItem(id, userId) {
    if (!id) {
        throw new Error('Item ID is required');
    }
    return await inventoryRepository.deleteInventoryItem(id, userId);
}

async function fetchProductCategories() {
    return await inventoryRepository.getProductCategories();
}

async function addDiscount(discount) {
  return await inventoryRepository.addDiscount(discount);
}

async function getUserDiscounts(userId) {
    return await inventoryRepository.getUserDiscounts(userId);
}

async function deleteDiscount(id, userId) {
   return await inventoryRepository.deleteDiscount(id, userId);
}

module.exports = {
    fetchInventoryItems,
    createInventoryItem,
    searchInventory,
    modifyInventoryItem,
    removeInventoryItem,
    getInventoryItemsByUser,
    fetchProductCategories,
    addDiscount,
    getUserDiscounts,
    deleteDiscount
};