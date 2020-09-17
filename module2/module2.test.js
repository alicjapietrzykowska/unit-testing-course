const VatService = require("./vatService");
const Product = require('./product');
const VatProvider = require('./vatProvider');

jest.mock('./vatProvider', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getDefaultVat: jest.fn(),
            getVatForType: jest.fn()
        }
    })
});

const { v4: uuidv4 } = require('uuid');

const generateProductWithPrice = (netPrice, type) => {
    return new Product(uuidv4(), netPrice, type);
}

describe('vatCalculator class tests', () => {
    
    beforeEach(() => {
        VatProvider.mockClear();
        vatProvider = new VatProvider();
        vatService = new VatService(vatProvider);
    });

    test('should calculate gross price for default VAT', () => {
        vatProvider.getDefaultVat.mockImplementation(() => 0.23);
        const product = generateProductWithPrice(20, 'food');
        const result = vatService.getGrossPriceForDefaultVat(product);
        expect(result).toEqual(24.6);
    });

    test('should throw an error when no product given to calculate default VAT value', () => {
        expect(() => {
            vatService.getGrossPriceForDefaultVat(null)
                .toThrowError('No product given')
        });
    });

    test('should calculate gross price for custom VAT value', () => {
        vatProvider.getVatForType.mockImplementation(() => 0.08);
        const product = generateProductWithPrice(10, 'clothes');
        const result = vatService.getGrossPrice(product.getNetPrice(), product.getProductType());
        expect(result).toEqual(10.8);
    });
    

    test('should throw an error when no netto price value given', () => {
        const product = generateProductWithPrice(10, 'food');
        expect(() => {
            vatService.getGrossPrice(null, 'food')
                .toThrowError('No product price given')
        });
    });

    test('should throw an error when no product type given', () => {
        const product = generateProductWithPrice(10, 'cats');
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), null)
                .toThrowError('No product type given')
        });
    });

    test('should throw an error when VAT value is too high', () => {
        const product = generateProductWithPrice(10, 'games');
        vatProvider.getVatForType.mockImplementation(() => 1.2);
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), product.getProductType())
                .toThrowError('VAT value is too high')
        });
    });

    test('should throw an error when VAT value is too low', () => {
        vatProvider.getVatForType.mockImplementation(() => -1);
        const product = generateProductWithPrice(10, 'fruits');
        expect(() => {
            vatService.getGrossPrice(product.getNetPrice(), product.getProductType())
                .toThrowError('VAT value is too low')
        });
    });

});

describe('Product class tests', () => {

    test('should return netto price', () => {
        const product = new Product(uuidv4(), 20, 'chocolates');
        const result = product.getNetPrice();
        expect(result).toEqual(20);
    });

    test('should return product type', () => {
        const product = new Product(uuidv4(), 20, 'chocolates');
        const result = product.getProductType();
        expect(result).toEqual('chocolates');
    });

    test('should throw an error when no product id given', () => {
        expect(() => {
            new Product(null, 20, 'drinks').toThrowError('No id given')
        });
    });

    test('should throw an error when no product netto price given', () => {
        expect(() => {
            new Product(uuidv4(), null, 'books').toThrowError('No product price given')
        });
    });
    
    test('should throw an error when no product type given', () => {
        expect(() => {
            new Product(uuidv4(), 20, null).toThrowError('No product type given')
        });
    });
});