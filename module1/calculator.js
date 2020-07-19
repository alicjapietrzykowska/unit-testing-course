
const add = (input) => {
    if (!input) {
        return 0;
    } else {
        if (typeof input !== 'string') {
            throw new Error('Invalid type of input');
        }

        let numbersArray = input.split(',').map(num => Number(num));
        if (numbersArray.includes(NaN)) {
            throw new Error('Invalid value of input string');
        }

        return numbersArray.reduce((numA, numB) => numA + numB);
    }
}

module.exports = add;
