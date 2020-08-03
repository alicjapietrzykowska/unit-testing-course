const Product = require('./product');
class VatService {
    
    constructor(vatValue) {
        this.vatValue = vatValue || 0.23;
    }

    getGrossPriceForDefaultVat(product) {
        if (!product) throw new Error ('No product given')
        return this.getGrossPrice(product.getNetPrice(), this.vatValue);
    }

    getGrossPrice(netPrice, vatValue) {
        if (!netPrice) throw new Error ('No net price value given')
        if (!vatValue) throw new Error ('No VAT value given')
        if (vatValue > 1) throw new Error ('VAT value is too high')
        if (vatValue < 0) throw new Error ('VAT value is too low')
        return netPrice * (1 + vatValue);
    }    
};

module.exports = VatService;