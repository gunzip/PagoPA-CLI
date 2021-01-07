const { TestScheduler } = require('jest')
const utils = require('../lib/utils')

test('Test fiscal code validate function', () => {
    expect(utils.validateFiscalCode('AAAAAA00A00A000A')).toBeTruthy()
    expect(utils.validateFiscalCode('MNCMVN93A22L191T')).toBeTruthy()
    expect(utils.validateFiscalCode('MNCMVN93A22L1912')).toBeFalsy()
    expect(utils.validateFiscalCode('fiscalcode')).toBeFalsy()
})

test('Test message validate function', () => {
    expect(utils.validateMessage("< 80 characaters")).toBeFalsy()
    expect(utils.validateMessage("A valid message must have a minimum of 80 characters and a maximum of 10,000 characters")).toBeTruthy()
})

test('Test subject validate function', () => {
    expect(utils.validateSubject("< 10 char")).toBeFalsy()
    expect(utils.validateSubject("A valid subject must have a minimum of 10 characters and a maximum of 120 characters")).toBeTruthy()
})