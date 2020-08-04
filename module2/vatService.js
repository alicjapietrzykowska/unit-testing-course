const Product = require('./product');

class VatService {
    
    constructor(vatProvider) {
        this.vatProvider = vatProvider;
    }

    getGrossPriceForDefaultVat(product) {
        if (!product) throw new Error ('No product given')
        return this.calculateGrossPrice(product.getNetPrice(), this.vatProvider.getDefaultVat());
    }

    getGrossPrice(netPrice, productType) {
        if (!productType) throw new Error ('No product type given')
        const vatValue = this.vatProvider.getVatForType(productType);
        return this.calculateGrossPrice(netPrice, vatValue);
    }    

    calculateGrossPrice(netPrice, vatValue) {
        if (!netPrice) throw new Error ('No product price given')
        if (!vatValue) throw new Error ('No VAT value given')
        if (vatValue > 1) throw new Error ('VAT value is too high')
        if (vatValue < 0) throw new Error ('VAT value is too low')
        return netPrice * (1 + vatValue);
    }
};

module.exports = VatService;