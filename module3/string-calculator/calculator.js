const NegativeNumberException = require("./negativeNumberException");

class Calculator {

    add(input) {
        if (!input) return 0;
        let regex = new RegExp(",|\n");
        let newInput = input;

        if (input.substring(0, 2) === '//') {
            regex = new RegExp(`\\${input[2]}|\n`);
            newInput = input.replace(input.substring(0, 3), '');
        }

        let numbersArray = newInput.split(regex).map(num => Number(num));

        if (numbersArray.some(num => !!!num && num !== 0)) {
            throw new Error(`${input[2]} expected but invalid symbol found instead`);
        } 
        
        if (numbersArray[numbersArray.length - 1] === 0) {
            throw new Error('Number expected but EOF found');
        }

        const negativeNumbers = numbersArray.filter(num => num < 0);
        if (negativeNumbers.length) {
            return new NegativeNumberException(negativeNumbers);
        };

        return numbersArray.reduce((numA, numB) => numA + numB);
    }
}
module.exports = Calculator;