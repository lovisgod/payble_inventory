const  { CustomerService } = require('../services/customerService');
const { validateCustomerData } = require('../dtos/Customer');

const customerController = {
    getCustomers: async (req, res) => {
        try {
            const userId = req.query.user_id;
            if (!userId) {
                return res.status(400).json({ status: 'error', message: 'user_id query parameter is required' });
            }
            const customers = await CustomerService.fetchCustomers(userId);
            res.status(200).json({ status: 'success', customers });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },

    addCustomer: async (req, res) => {
        try {
            const { error } = await validateCustomerData(req.body);
            if (error) {
                return res.status(400).json({ status: 'error', message: error.details[0].message });
            }
            const customer = req.body;
            const newCustomer = await CustomerService.createCustomer(customer);
            res.status(201).json({ status: 'success', customer: newCustomer });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },

    getCustomerDetail: async (req, res) => {
        try {
            const customerId = req.params.id;
            const customer = await CustomerService.getCustomerDetail(customerId);
            if (!customer) {
                return res.status(404).json({ status: 'error', message: 'Customer not found' });
            }
            res.status(200).json({ status: 'success', customer });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const customerId = req.params.id;
            await CustomerService.deleteCustomer(customerId);
            res.status(200).json({ status: 'success', message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
};

module.exports = customerController;