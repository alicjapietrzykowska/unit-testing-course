const add = require("./calculator");


test("Should return a number when one number given", () => {
    expect(add('1')).toBe(1);
});

test("Should sum two numbers when two numbers given", () => {
    expect(add('1,2')).toBe(3);
});

test("Should sum all numbers given", () => {
    expect(add('5,10,50,100')).toBe(165);
});

test("Should return 0 when no input given", () => {
    expect(add()).toBe(0);
});

test("Should throw an error when the input type is invalid", () => {
    expect(() => add([1,2])).toThrow(new Error('Invalid type of input'));
});

test("Should throw an error when only an invalid string given", () => {
    expect(() => add('test')).toThrow(new Error('Invalid value of input string'));
});

test("Should throw an error when input string includes invalid values", () => {
    expect(() => add('1,2,test')).toThrow(new Error('Invalid value of input string'));
});

