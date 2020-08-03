const VatService = require("./vatCalculator");
const Product = require('./product');
const { v4: uuidv4 } = require('uuid');

const generateProductWithPrice = (netPrice) => {
    return new Product(uuidv4(), netPrice);
}

describe('vatCalculator class tests', () => {
    
    beforeEach(() => {
        vatService = new VatService();
    });

    test('should calculate gross price for default VAT', () => {
        const product = generateProductWithPrice(20);
        const result = vatService.getGrossPriceForDefaultVat(product);
        expect(result).toEqual(24.6);
    });

    test('should throw an error when no product given to function with default VAT value', () => {
        expect(() => {
            vatService.getGrossPriceForDefaultVat(null)
                .toThrow(new Error('No product given'))
        });
    });

    test('should calculate gross price for other VAT value', () => {
        const product = generateProductWithPrice(10);
        const result = vatService.getGrossPrice(product.getNetPrice(), 0.08);
        expect(result).toEqual(10.8);
    });
    

    test('should throw an error when no net price value given', () => {
        const product = generateProductWithPrice(10);
        expect(() => {
            vatService.getGrossPrice(null, 0.23)
                .toThrow(new Error('No net price value given'))
        });
    });
    test('should throw an error when no VAT value given', () => {
        const product = generateProductWithPrice(10);
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), null)
                .toThrow(new Error('No VAT value given'))
        });
    });

    test('should throw an error when VAT value is too high', () => {
        const product = generateProductWithPrice(10);
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), 1.2)
                .toThrow(new Error('VAT value is too high'))
        });
    });

    test('should throw an error when VAT value is too low', () => {
        const product = generateProductWithPrice(10);
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), -1)
                .toThrow(new Error('VAT value is too low'))
        });
    });

});

describe('Product class tests', () => {

    test('should return net price', () => {
        const product = new Product(uuidv4(), 20);
        const result = product.getNetPrice();
        expect(result).toEqual(20);
    });

    test('should throw an error when no product id given', () => {
        expect(() => {
            new Product(null, 20).toThrow(new Error('No id given'))
        });
    });

    test('should throw an error when no product net price given', () => {
        expect(() => {
            new Product(uuidv4(), null).toThrow(new Error('No net price given'))
        });
    });
});