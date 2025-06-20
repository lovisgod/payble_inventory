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

async function updateInventoryItem(id, updates) {
    const { data, error } = await supabase
        .from('inventory')
        .update(updates)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function deleteInventoryItem(id) {
    const { data, error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

module.exports = {
    getInventoryItems,
    getInventoryItemsByUser,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};