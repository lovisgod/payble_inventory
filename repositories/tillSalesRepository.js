const { validateTillSales } = require("../dtos/TillSales");
const supabase = require('../handlers/supabaseConnector');


const TillSalesRepository = {

    async getTillSales() {
        const { data, error } = await supabase
            .from('till_sales')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async getTillSalesByUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const { data, error } = await supabase
            .from('till_sales')
            .select('*')
            .eq('user_id', userId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },    

    async addTillSale(sale) {
        // validate sale object using TillSalesSchema
        const { status, message } = validateTillSales(sale);
        if (!status) {
            throw new Error(message);
        }
        // remove synced and transaction_date from sale object
        // this is to ensure that these fields are not sent to the database
        delete sale.synced;
        delete sale.transaction_date;
        const { data, error } = await supabase
            .from('till_sales')
            .insert(sale)
            .select();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
}

module.exports = {
    TillSalesRepository
}