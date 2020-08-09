const Calculator = require("./calculator");
const NegativeNumberException = require("./negativeNumberException");

describe('Calculator tests', () => {

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should return zero when got empty string', () => {
        const result = calculator.add("")
        expect(result).toBe(0);
    });

    it('should return number when given number', () => {
        const result = calculator.add("1")
        expect(result).toBe(1);
    });

    it('should add two numbers separated with comma', () => {
        const result = calculator.add("1,2")
        expect(result).toBe(3);
    });

    it('should add three numbers separated with comma', () => {
        const result = calculator.add("1,2,3")
        expect(result).toBe(6);
    });

    it('should add decimal numbers separated with comma', () => {
        const result = calculator.add("1,2,3.7")
        expect(result).toBe(6.7);
    });

    it('should add three numbers separated with comma and new line', () => {
        const result = calculator.add("1,2\n4")
        expect(result).toBe(7);
    });

    it('should set a new separator and add numbers', () => {
        const result = calculator.add("//;\n1;2")
        expect(result).toBe(3);
    });

    it('should set a new separator and throw error', () => {
        expect(() => calculator.add("//|\n1|2,3")).toThrow(`| expected but invalid symbol found`);
    });

    it('should return exception when EOF found', () => {
        expect(() => calculator.add("1,2,\n4\n")).toThrow('Number expected but EOF found')
    });

    it('should return exception when negative number provided', () => {
        const exception = calculator.add('-1');
        expect(exception).toEqual(new NegativeNumberException([-1]))
    });

    it('should include all negative numbers in exception message', () => {
        const exception = calculator.add('-1,-2');
        expect(exception.getMessage()).toBe("Negative not allowed : -1, -2");
    });
});

