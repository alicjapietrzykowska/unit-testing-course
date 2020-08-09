
class NegativeNumberException {
    constructor(numbers = null) {
        this.numbers = numbers;
    }

    getMessage() {
        return `Negative not allowed : ${this.numbers.join(', ')}`;
    }
}


module.exports = NegativeNumberException;