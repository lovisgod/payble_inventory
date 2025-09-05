const supabase = require('../handlers/supabaseConnector');

const CustomerRepository = { 
    async getCustomers() {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw new Error(error.message);
    return data;
},

async addCustomer(customer) {
    const { data, error } = await supabase.from('customers').insert(customer).select();
    if (error) throw new Error(error.message);
    return data[0];
},

async getCustomerById(id) {
    const { data, error } = await supabase.from('customers').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
},

async deleteCustomer(id) {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw new Error(error.message);
}

}
module.exports = { CustomerRepository };