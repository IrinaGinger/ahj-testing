import paySystem from '../pay-system-validator';

let cardSystems = [
    ['visa', '', [4]], 
    ['mastercard', '', [5]],
    ['american-express', '', [37]],
    ['discover', '', [60, 65]],
    ['jcb', '', [35]],
    ['mir', '', [22]],
];

let numbers = [
    {number: '5', system: 'mastercard'}, 
    {number: '4', system: 'visa'},
    {number: '37', system: 'american-express'}, 
    {number: '35', system: 'jcb'},
    {number: '65', system: 'discover'},
    {number: '22', system: 'mir'},
]

test.each(numbers)('card system should be defined', (item) => {
    let result = paySystem(item.number, cardSystems);
    expect(result).toEqual(item.system);
});

test('card system should be undefined', () => {
    expect(paySystem("1", cardSystems)).toEqual(undefined);
});