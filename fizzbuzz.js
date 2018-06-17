module.exports = (n) => {
    if (n % 3 == 0 && n % 5 == 0) {
        return 'Fizzbuzz'
    } else if (n % 3 == 0) {
        return 'Fizz'
    } else if (n % 5 == 0) {
        return 'Buzz'
    }
    return n.toString();
}