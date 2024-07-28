import isValidCard from '../card-number-validator'

let cardNumbers = [
    '4716757376937910',
    '6011683491974793',
    '5152371321516551',
    '3538541200042750',
    '379951050448080'
]

test.each(cardNumbers)('card numbers are valid', (value) => {
    expect(isValidCard(value)).toBe(true);
});

test('wrong card number should be invalid', () => {
    expect(isValidCard('1234567812345678')).toBe(false);
});
