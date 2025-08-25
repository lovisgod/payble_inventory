const { TillSalesService } = require("../services/tillSalesService");

const TillSalesController = {

    async getTillSales(req, res) {
        try {
            const sales = await TillSalesService.getTillSales();
            res.status(200).json({ status: 'success', data: sales });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },

    async getTillSalesByUser(req, res) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).json({ status: 'error', message: 'User ID is required' });
            }
            const sales = await TillSalesService.getTillSalesByUser(userId);
            res.status(200).json({ status: 'success', data: sales });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    },

    async addTillSale(req, res) {
        try {
            const sale = req.body;
            if (!sale || !sale.user_id) {
                return res.status(400).json({ status: 'error', message: 'Invalid sale data' });
            }
            const newSale = await TillSalesService.addTillSale(sale);
            res.status(201).json({ status: 'success', message: 'Sale added successfully', sale: newSale });
        } catch (error) {
            console.log('Error adding till sale:', error);
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = {
    TillSalesController
}