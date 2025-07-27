const { TillSalesRepository } = require("../repositories/tillSalesRepository");

const TillSalesService = {
    async getTillSales() {
        return await TillSalesRepository.getTillSales();
    },

    async getTillSalesByUser(userId) {
        return await TillSalesRepository.getTillSalesByUser(userId);
    },

    async addTillSale(sale) {
        return await TillSalesRepository.addTillSale(sale);
    }
}

module.exports = {
    TillSalesService
}