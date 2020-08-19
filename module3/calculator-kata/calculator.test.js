const Calculator = require("./calculator");

describe('Calculator tests', () => {

    beforeEach(() => {
        calculator = new Calculator();
    })

    it('should return 0 when input is empty', () => {
        const result = calculator.add('');
        expect(result).toBe(0);
    });

    it('should add two numbers separated by comma', () => {
        const result = calculator.add('1,2')
        expect(result).toBe(3);
    });

    it('should add three numbers separated by comma', () => {
        const result = calculator.add('1,2,3')
        expect(result).toBe(6);
    });

    it('should add numbers with decimals', () => {
        const result = calculator.add('1,2.5')
        expect(result).toBe(3.5);
    });

    it('should allow newlines as separators', () => {
        const result = calculator.add('1\n5');
        expect(result).toBe(6);
    });

    it('should throw an error when the input ends with separator', () => {
        expect(() => calculator.add('1,2,3,')).toThrow('Number expected but EOF found');
    });

    it('should throw an error when no number between separators', () => {
        expect(() => calculator.add('1,2,\n3')).toThrow('Number expected but an empty space between separators found');
    });

    it('should throw an error when invalid character found', () => {
        expect(() => calculator.add('1,2,test,3')).toThrow('Number expected but invalid character found');
    });
})
