class Product {

    constructor(id, netPrice, type) {
        if (!id) throw new Error ('No id given')
        if (!netPrice) throw new Error ('No product price given')
        if (!type) throw new Error ('No product type given')
        this.id = id;
        this.netPrice = netPrice;
        this.type = type;
    }

    getNetPrice() { return this.netPrice };
    getProductType() { return this.type };
}; 

module.exports = Product;
