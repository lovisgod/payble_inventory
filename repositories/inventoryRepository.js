const supabase = require('../handlers/supabaseConnector');

async function getInventoryItems() {
    const { data, error } = await supabase
        .from('inventory')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function getInventoryItemsByUser(userId) {
    const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching inventory items by user:', error);
        throw new Error(error.message);
    }
    return data;
}

async function searchInventory(userId, filters) {
    let query = supabase.from('inventory').select('*').eq('user_id', userId);

    // Dynamically apply filters
    // we are assuming filters is an object with keys matching the column names in the inventory table
    // e.g., { category_id: 1, name: 'item_name', sku: 'item_sku' }
    // we are using chaining to build the query
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function addInventoryItem(item) {
    const { data, error } = await supabase
        .from('inventory')
        .insert(item)
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function updateInventoryItem(id, updates, userId) {
    const { data, error } = await supabase
        .from('inventory')
        .update(updates)
        .eq('id', id)
        // .eq('user_id', userId)
        .select();
    if (!data || data.length === 0) {
        throw new Error('Item not found or no changes made.');
    }
    if (error) {
        console.error('Error updating inventory item:', error);
        throw new Error(error.message);
    }
    return data;
}

async function deleteInventoryItem(id, userId) {
    const { data, error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function getProductCategories() {
    const { data, error } = await supabase
        .from('category') // Assuming the table name is 'categories'
        .select('*');

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function addDiscount(discount) {
    const { data, error } = await supabase
        .from('discount')
        .insert(discount)
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function getUserDiscounts(userId) {
    const { data, error } = await supabase
        .from('discount')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function deleteDiscount(id, userId) {
    const { data, error } = await supabase
        .from('discount')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

module.exports = {
    getInventoryItems,
    getInventoryItemsByUser,
    addInventoryItem,
    searchInventory,
    updateInventoryItem,
    deleteInventoryItem,
    getProductCategories,
    addDiscount,
    getUserDiscounts,
    deleteDiscount
};