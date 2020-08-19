
class Calculator {

    add(input) {
        if (!input) return 0;
        const regex = new RegExp(",|\n");
        const arrayOfNumbers = input.split(regex).map(num => Number(num));

        if (arrayOfNumbers[arrayOfNumbers.length - 1] === 0) {
            throw 'Number expected but EOF found';
        }

        if (arrayOfNumbers.some(num => num === 0)) {
            throw 'Number expected but an empty space between separators found';
        }

        if (arrayOfNumbers.includes(NaN)) {
            throw 'Number expected but invalid character found';
        }

        return arrayOfNumbers.reduce((a, b) => a + b);
    }
}

module.exports = Calculator;