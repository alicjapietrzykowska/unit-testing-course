class Product {

    constructor(id, netPrice) {
        if (!id) throw new Error ('No id given')
        if (!netPrice) throw new Error ('No net price given')
        this.id = id;
        this.netPrice = netPrice;
    }

    getNetPrice() { return this.netPrice };
}; 

module.exports = Product;
