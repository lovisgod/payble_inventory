const { CustomerRepository } = require('../repositories/customerRepository');

const CustomerService = {
  async fetchCustomers() {
    return await CustomerRepository.getCustomers();
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