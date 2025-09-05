const { CustomerRepository } = require('../repositories/customerRepository');

const CustomerService = {
  async fetchCustomers(user_id) {
    return await CustomerRepository.getCustomers(user_id);
},

async createCustomer(customer) {
    return await CustomerRepository.addCustomer(customer);
},

async getCustomerDetail(id) {
    return await CustomerRepository.getCustomerById(id);
},

async deleteCustomer(id) {
    return await CustomerRepository.deleteCustomer(id);
}
}

module.exports = { CustomerService };